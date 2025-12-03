import { NextRequest, NextResponse } from 'next/server';

import { hasValidSession } from '@repo/auth';
import { auth } from '@repo/auth/auth.config';

// Public routes that don't require authentication
const publicRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/api/auth",
];

// Admin only routes - using regex patterns
const adminRoutes = ["/user"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Check if route is public
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Simple session check using cookies
  const hasSession = hasValidSession(request);

  // If not authenticated and trying to access protected route
  if (!hasSession && !isPublicRoute) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If authenticated and trying to access public auth routes, redirect to home
  if (hasSession && isPublicRoute && pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  // Check admin role for admin routes
  if (hasSession && isAdminRoute) {
    try {
      // Get session to check user role
      const session = await auth.api.getSession({
        headers: request.headers,
      });
      console.log("sessionsession", session);

      if (!session?.user) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }

      const userRole = session.user.userRole;

      // Check if user has admin or super_admin role
      if (userRole !== "admin" && userRole !== "super_admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } catch (error) {
      console.error("Error checking admin role:", error);
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
