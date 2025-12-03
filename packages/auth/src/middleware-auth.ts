// Lightweight auth configuration for middleware (Edge Runtime compatible)
// This file should NOT import any Node.js specific APIs or database connections

export const AUTH_COOKIE_NAME = "better-auth.session_token";

// Extract session token from cookies
export function getSessionToken(request: Request): null | string {
  const cookies = request.headers.get("cookie");
  if (!cookies) return null;

  const match = cookies.match(new RegExp(`${AUTH_COOKIE_NAME}=([^;]+)`));
  return match ? match[1] : null;
}

// Simple session validation for middleware
export function hasValidSession(request: Request): boolean {
  const cookies = request.headers.get("cookie");
  if (!cookies) return false;

  return cookies.includes(AUTH_COOKIE_NAME);
}
