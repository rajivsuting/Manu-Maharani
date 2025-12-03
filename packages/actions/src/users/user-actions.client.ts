"use server";

import { auth } from '@repo/auth/auth.config';
import { db, eq, schema } from '@repo/db';
import { userRoles } from '@repo/db/schema/auth.schema';

import { AppResponseHandler } from '../utils/app-response-handler';

import type { TNewUser } from "@repo/db/schema/auth.schema";

async function canModifyUser(id: string) {
  const session = await getCurrentSession();
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  // Get target user from database
  const targetUser = await db
    .select({ id: schema.Users.id, user_role: schema.Users.userRole })
    .from(schema.Users)
    .where(eq(schema.Users.id, id))
    .limit(1);

  const user = targetUser[0];
  if (!user) {
    throw new Error("Target user not found");
  }

  const currentUserRole = session.user.userRole;
  const targetUserRole = user.user_role;
  const isSameUser = session.user.id === user.id;

  // Cannot modify yourself
  if (isSameUser) {
    throw new Error("Cannot modify your own account");
  }

  // Non-super-admin cannot modify super-admin users
  if (targetUserRole === "super_admin" && currentUserRole !== "super_admin") {
    throw new Error("Cannot modify super admin users");
  }

  return user;
}

// Helper function to get current session
async function getCurrentSession() {
  const headersList = await import("next/headers").then((m) => m.headers());
  return await auth.api.getSession({
    headers: headersList,
  });
}

// Role check helper
async function requireSuperAdmin() {
  const session = await getCurrentSession();

  if (!session?.user || session.user.userRole !== "super_admin") {
    throw new Error("Access denied. Super admin role required.");
  }
}

export const createUser = async (data: TNewUser) => {
  await requireSuperAdmin();

  try {
    // Create user using better-auth
    const result = await auth.api.signUpEmail({
      body: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        name: data.name,
        password: data.password || "TempPassword123!", // Generate a temporary password
        phone: data.phone,
        userRole: data.userRole || "user",
      },
    });

    if (!result?.data?.user) {
      throw new Error("Failed to create user");
    }

    return AppResponseHandler.success(result.data.user);
  } catch (error) {
    console.error("Error creating user:", error);
    return AppResponseHandler.error("Failed to create user");
  }
};

export const updateUser = async (
  id: string,
  data: Partial<Omit<TNewUser, "createdAt" | "id" | "updatedAt">>
) => {
  await requireSuperAdmin();
  const targetUser = await canModifyUser(id);

  if (!targetUser) return;

  try {
    // Prepare update data for database
    const updateData: Record<string, unknown> = {};

    if (data.firstName) updateData.firstName = data.firstName;
    if (data.lastName) updateData.lastName = data.lastName;
    if (data.name) updateData.name = data.name;
    if (data.phone) updateData.phone = data.phone;
    if (data.userRole !== undefined) updateData.userRole = data.userRole;

    // Update user in database
    const [updatedUser] = await db
      .update(schema.Users)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(schema.Users.id, id))
      .returning();

    return AppResponseHandler.success(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return AppResponseHandler.error("Failed to update user");
  }
};

export const deleteUser = async (id: string) => {
  const token = await auth.api.getAccessToken();
  await requireSuperAdmin();
  await canModifyUser(id);

  try {
    // Delete user using better-auth API
    await auth.api.deleteUser({
      body: { token },
    });

    // Also delete from our database directly
    await db.delete(schema.Users).where(eq(schema.Users.id, id));

    return AppResponseHandler.success({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return AppResponseHandler.error("Failed to delete user");
  }
};
