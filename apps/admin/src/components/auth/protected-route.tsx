"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-provider";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "user" | "admin" | "super_admin";
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredRole,
  fallback 
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/sign-in");
    }
  }, [user, isLoading, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // User not authenticated
  if (!user) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Access Denied</h2>
          <p className="text-muted-foreground">Please sign in to continue</p>
        </div>
      </div>
    );
  }

  // Check role requirements
  if (requiredRole) {
    const hasRequiredRole = () => {
      switch (requiredRole) {
        case "super_admin":
          return user.userRole === "super_admin";
        case "admin":
          return user.userRole === "admin" || user.userRole === "super_admin";
        case "user":
          return true; // All authenticated users have user access
        default:
          return false;
      }
    };

    if (!hasRequiredRole()) {
      return fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Insufficient Permissions</h2>
            <p className="text-muted-foreground">
              You don't have permission to access this page
            </p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}
