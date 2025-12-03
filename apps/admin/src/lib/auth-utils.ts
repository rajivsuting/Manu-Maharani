import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@repo/auth/auth.config';

// Server-side function to get current user with role
export async function getCurrentUser() {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    return session?.user || null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

// Utility function to check if user has specific role (returns boolean)
export async function hasRole(
  role: "admin" | "super_admin" | "user"
): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.userRole === role;
}

// Utility function to check if user is admin (admin or super_admin)
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.userRole === "admin" || user?.userRole === "super_admin";
}

// Utility function to check if user is super admin
export async function isSuperAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.userRole === "super_admin";
}

// Server-side function to check if user has admin role
export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.userRole !== "admin" && user.userRole !== "super_admin") {
    redirect("/unauthorized");
  }

  return user;
}

// Server-side function to check specific role
export async function requireRole(role: "admin" | "super_admin" | "user") {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.userRole !== role) {
    redirect("/unauthorized");
  }

  return user;
}

// Server-side function to check if user has super admin role
export async function requireSuperAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.userRole !== "super_admin") {
    redirect("/unauthorized");
  }

  return user;
}
