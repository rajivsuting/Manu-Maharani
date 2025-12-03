import { createAuthClient } from 'better-auth/client';

import type { User } from "./auth.config";

// Export auth from config file
// export { auth } from "./auth.config";
export type { Session, User } from "./auth.config";

// Export middleware utilities
export * from "./middleware-auth";

// Re-export useful types and utilities from better-auth
export type {
  AuthContext,
  BetterAuthOptions,
  Session as BetterAuthSession,
  User as BetterAuthUser,
} from "better-auth";

// Auth client configuration for frontend
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3001",
  credentials: "include",
});

// Helper functions for common auth operations
export const authHelpers = {
  // Check if user has specific role
  hasRole: (user: null | User, role: string): boolean => {
    if (!user) return false;
    return (user as any).userRole === role;
  },

  // Check if user is admin
  isAdmin: (user: null | User): boolean => {
    if (!user) return false;
    return (
      (user as any).userRole === "admin" ||
      (user as any).userRole === "super_admin"
    );
  },

  // Check if user is super admin
  isSuperAdmin: (user: null | User): boolean => {
    if (!user) return false;
    return (user as any).userRole === "super_admin";
  },

  // Get user full name
  getFullName: (user: null | User): string => {
    if (!user) return "";
    const userAny = user as any;
    if (userAny.firstName && userAny.lastName) {
      return `${userAny.firstName} ${userAny.lastName}`;
    }
    return userAny.name || userAny.email || "";
  },

  // Get user initials
  getInitials: (user: null | User): string => {
    if (!user) return "";
    const userAny = user as any;
    if (userAny.firstName && userAny.lastName) {
      return `${userAny.firstName[0]}${userAny.lastName[0]}`.toUpperCase();
    }
    const name = userAny.name || userAny.email || "";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  },
};
