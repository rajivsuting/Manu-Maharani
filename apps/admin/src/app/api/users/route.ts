import { auth } from "@repo/auth/auth.config";
import { and, count, db, eq, like, or, Users } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/users - List users with pagination and search
export async function GET(request: NextRequest) {
  try {
    // Check authentication and admin permissions
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    if (
      session.user.userRole !== "admin" &&
      session.user.userRole !== "super_admin"
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") || "";
    const status = searchParams.get("status") || "";

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

    if (role) {
      conditions.push(eq(Users.userRole, role as any));
    }

    if (status === "active") {
      conditions.push(eq(Users.isActive, true));
    } else if (status === "inactive") {
      conditions.push(eq(Users.isActive, false));
    }

    // Get users with pagination
    const users = await db
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
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .limit(limit)
      .offset(offset)
      .orderBy(Users.createdAt);

    const totalResponse = await db
      .select({ count: count() })
      .from(Users)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    const _count = totalResponse[0]?.count ?? 0;
    return NextResponse.json({
      pagination: {
        limit,
        page,
        total: _count,
        totalPages: Math.ceil(_count / limit),
      },
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new user (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin permissions
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    if (
      session.user.userRole !== "admin" &&
      session.user.userRole !== "super_admin"
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { email, firstName, lastName, name, password, phone, userRole } =
      body;

    // Validate required fields
    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "Email, name, and password are required" },
        { status: 400 }
      );
    }

    // Create user using better-auth
    const result = await auth.api.signUpEmail({
      body: {
        email,
        firstName,
        lastName,
        name,
        password,
        phone,
        userRole: userRole || "user",
      },
    });

    if (!result) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "User created successfully", user: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
