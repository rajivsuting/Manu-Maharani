import { headers } from 'next/headers';
import { unauthorized } from 'next/navigation';

import { auth } from '@repo/auth/auth.config';
import { and, count, db, eq, like, or, Users } from '@repo/db';

import { AppResponseHandler } from '../utils/app-response-handler';

import type { TGetUsersFilters } from "./user-actions.types";

export async function createUser(data: {
  email: string;
  firstName?: string;
  lastName?: string;
  name: string;
  password: string;
  phone?: string;
  userRole?: "admin" | "super_admin" | "user";
}) {
  try {
    // Check authentication and admin permissions
    const session = await getCurrentSession();
    if (!session?.user || !isAdmin(session.user.userRole)) {
      return unauthorized();
    }

    // Create user using better-auth
    const result = await auth.api.signUpEmail({
      body: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        name: data.name,
        password: data.password,
        phone: data.phone,
        userRole: data.userRole || "user",
      },
    });

    if (!result) {
      throw new Error("Failed to create user");
    }

    return AppResponseHandler.success(result);
  } catch (error) {
    console.error("Error creating user:", error);
    return AppResponseHandler.error("Failed to create user");
  }
}

export async function deleteUser(id: string) {
  try {
    const session = await getCurrentSession();
    if (!session?.user || !isAdmin(session.user.userRole)) {
      return AppResponseHandler.error("Unauthorized", 401);
    }

    // Prevent self-deletion
    if (session.user.id === id) {
      return AppResponseHandler.error("Cannot delete your own account", 400);
    }

    // Check if user exists
    const [existingUser] = await db
      .select()
      .from(Users)
      .where(eq(Users.id, id))
      .limit(1);

    if (!existingUser) {
      return AppResponseHandler.error("User not found", 404);
    }

    // Delete user using better-auth (this will handle cleanup of related records)
    await auth.api.deleteUser({
      body: { userId: id },
    });

    return AppResponseHandler.success({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return AppResponseHandler.error("Failed to delete user");
  }
}

export async function getUserById(id: string) {
  try {
    const session = await getCurrentSession();
    if (!session?.user) {
      return AppResponseHandler.error("Unauthorized", 401);
    }

    // Users can only access their own data unless they're admin
    if (session.user.id !== id && !isAdmin(session.user.userRole)) {
      return AppResponseHandler.error("Forbidden", 403);
    }

    const [user] = await db
      .select({
        createdAt: Users.createdAt,
        email: Users.email,
        emailVerified: Users.emailVerified,
        firstName: Users.firstName,
        id: Users.id,
        image: Users.image,
        isActive: Users.isActive,
        lastName: Users.lastName,
        name: Users.name,
        phone: Users.phone,
        updatedAt: Users.updatedAt,
        userRole: Users.userRole,
      })
      .from(Users)
      .where(eq(Users.id, id))
      .limit(1);

    if (!user) {
      return AppResponseHandler.error("User not found", 404);
    }

    return AppResponseHandler.success(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return AppResponseHandler.error("Failed to fetch user");
  }
}

export async function updateUser(
  id: string,
  data: {
    firstName?: string;
    image?: string;
    isActive?: boolean;
    lastName?: string;
    name?: string;
    phone?: string;
    userRole?: "admin" | "super_admin" | "user";
  }
) {
  try {
    const session = await getCurrentSession();
    if (!session?.user) {
      return AppResponseHandler.error("Unauthorized", 401);
    }

    // Users can only update their own data unless they're admin
    if (session.user.id !== id && !isAdmin(session.user.userRole)) {
      return AppResponseHandler.error("Forbidden", 403);
    }

    // Check if user exists
    const [existingUser] = await db
      .select()
      .from(Users)
      .where(eq(Users.id, id))
      .limit(1);

    if (!existingUser) {
      return AppResponseHandler.error("User not found", 404);
    }

    // Prepare update data
    const updateData: any = {};

    if (data.name) updateData.name = data.name;
    if (data.firstName) updateData.firstName = data.firstName;
    if (data.lastName) updateData.lastName = data.lastName;
    if (data.phone) updateData.phone = data.phone;
    if (data.image) updateData.image = data.image;

    // Only admins can change role and active status
    if (isAdmin(session.user.userRole)) {
      if (data.userRole) updateData.userRole = data.userRole;
      if (typeof data.isActive === "boolean")
        updateData.isActive = data.isActive;
    }

    // Update user
    const [updatedUser] = await db
      .update(Users)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(Users.id, id))
      .returning({
        createdAt: Users.createdAt,
        email: Users.email,
        emailVerified: Users.emailVerified,
        firstName: Users.firstName,
        id: Users.id,
        image: Users.image,
        isActive: Users.isActive,
        lastName: Users.lastName,
        name: Users.name,
        phone: Users.phone,
        updatedAt: Users.updatedAt,
        userRole: Users.userRole,
      });

    return AppResponseHandler.success(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return AppResponseHandler.error("Failed to update user");
  }
}

// Helper function to get current session
async function getCurrentSession() {
  const headersList = headers();
  return await auth.api.getSession({
    headers: headersList,
  });
}

// Helper function to check if user is admin
function isAdmin(userRole?: string | null) {
  if (!userRole) return false;
  return userRole === "admin" || userRole === "super_admin";
}

export const getUsers = async (filters: TGetUsersFilters) => {
  const session = await getCurrentSession();

  if (!session?.user || !isAdmin(session.user.userRole)) {
    throw Error("Unauthorized", {});
  }

  const { limit = 10, page = 1, roles, search } = filters;
  const offset = (page - 1) * limit;

  // Build where conditions
  const conditions = [];

  if (search) {
    conditions.push(
      or(
        like(Users.name, `%${search}%`),
        like(Users.email, `%${search}%`),
        like(Users.firstName, `%${search}%`),
        like(Users.lastName, `%${search}%`)
      )
    );
  }

  if (roles && roles.length > 0) {
    conditions.push(
      or(...roles.map((role) => eq(Users.userRole, role as any)))
    );
  }

  // Get users with pagination
  const users = await db
    .select()
    .from(Users)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .limit(limit)
    .offset(offset)
    .orderBy(Users.createdAt);

  // Get total count
  const totalResponse = await db
    .select({ count: count() })
    .from(Users)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  const total = totalResponse[0]?.count ?? 0;

  return AppResponseHandler.success({
    pagination: {
      limit,
      page,
      totalPages: Math.ceil(total / limit),
    },
    total,
    users,
  });
};
