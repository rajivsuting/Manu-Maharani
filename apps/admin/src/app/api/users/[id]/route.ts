import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@repo/auth/auth.config';
import { db, eq, Users } from '@repo/db';

// DELETE /api/users/[id] - Delete user (admin only)
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     // Check authentication
//     const session = await auth.api.getSession({
//       headers: request.headers,
//     });

//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Only admins can delete users
//     if (
//       session.user.userRole !== "admin" &&
//       session.user.userRole !== "super_admin"
//     ) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     const { id } = params;

//     // Prevent self-deletion
//     if (session.user.id === id) {
//       return NextResponse.json(
//         { error: "Cannot delete your own account" },
//         { status: 400 }
//       );
//     }

//     // Check if user exists
//     const [existingUser] = await db
//       .select()
//       .from(Users)
//       .where(eq(Users.id, id))
//       .limit(1);

//     if (!existingUser) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // Delete user using better-auth (this will handle cleanup of related records)
//     await auth.api.deleteUser({
//       body: { token: await auth.api.getAccessToken() },
//     });

//     return NextResponse.json({
//       message: "User deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// GET /api/users/[id] - Get user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Users can only access their own data unless they're admin
    if (
      session.user.id !== id &&
      session.user.userRole !== "admin" &&
      session.user.userRole !== "super_admin"
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get user by ID
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
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id] - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Users can only update their own data unless they're admin
    if (
      session.user.id !== id &&
      session.user.userRole !== "admin" &&
      session.user.userRole !== "super_admin"
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Check if user exists
    const [existingUser] = await db
      .select()
      .from(Users)
      .where(eq(Users.id, id))
      .limit(1);

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prepare update data
    const updateData: Record<string, unknown> = {};

    if (body.name) updateData.name = body.name;
    if (body.firstName) updateData.firstName = body.firstName;
    if (body.lastName) updateData.lastName = body.lastName;
    if (body.phone) updateData.phone = body.phone;
    if (body.image) updateData.image = body.image;

    // Only admins can change role and active status
    if (
      session.user.userRole === "admin" ||
      session.user.userRole === "super_admin"
    ) {
      if (body.userRole) updateData.userRole = body.userRole;
      if (typeof body.isActive === "boolean")
        updateData.isActive = body.isActive;
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

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
