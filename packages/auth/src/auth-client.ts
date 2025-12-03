import { betterAuth } from 'better-auth';

// Simple auth configuration for client-side and middleware use
// This doesn't include database configuration to avoid Edge Runtime issues
export const authClient = betterAuth({
  // Basic configuration without database
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  // Social providers configuration (optional)
  socialProviders: {
    // google: {
    //   clientId: process.env.GOOGLE_CLIENT_ID || "",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    //   enabled: !!(
    //     process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    //   ),
    // },
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },

  // Security configuration
  advanced: {
    generateId: () => {
      return crypto.randomUUID();
    },
    useSecureCookies: process.env.NODE_ENV === "production",
  },

  // CSRF protection
  csrf: {
    enabled: true,
  },

  // Trusted origins for CORS
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    process.env.NEXTAUTH_URL || "http://localhost:3000",
  ],
});

// Export basic types (Better Auth type inference is complex)
export type ClientSession = {
  expiresAt: Date;
  id: string;
  ipAddress?: string;
  token: string;
  userAgent?: string;
  userId: string;
};

export type ClientUser = {
  createdAt: Date;
  email: string;
  emailVerified: boolean;
  id: string;
  image?: string;
  name: string;
  updatedAt: Date;
};
