import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { Accounts, db, Sessions, Users, Verifications } from '@repo/db';

// Simple email sending function placeholder
async function sendEmail({
  html,
  subject,
  text,
  to,
}: {
  html?: string;
  subject: string;
  text?: string;
  to: string;
}) {
  // In a real implementation, you would use a service like Resend, SendGrid, etc.
  console.log(`Email would be sent to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Content: ${html || text}`);

  // For development, just log the email
  return { success: true };
}

// Better Auth configuration
export const auth = betterAuth({
  // Database configuration with Drizzle adapter
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      account: Accounts,
      session: Sessions,
      user: Users,
      verification: Verifications,
    },
  }),

  // Email and password configuration
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true when email service is configured
    sendResetPassword: async ({ url, user }: { url: string; user: any }) => {
      await sendEmail({
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Reset Your Password</h2>
            <p>Hello ${user.name || user.email},</p>
            <p>You requested to reset your password. Click the button below to set a new password:</p>
            <a href="${url}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">Reset Password</a>
            <p>If you didn't request this, please ignore this email.</p>
            <p>This link will expire in 1 hour.</p>
          </div>
        `,
        subject: "Reset Your Password",
        to: user.email,
      });
    },
    sendVerificationEmail: async ({
      url,
      user,
    }: {
      url: string;
      user: any;
    }) => {
      await sendEmail({
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Verify Your Email Address</h2>
            <p>Hello ${user.name || user.email},</p>
            <p>Please verify your email address by clicking the button below:</p>
            <a href="${url}" style="display: inline-block; background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">Verify Email</a>
            <p>If you didn't create this account, please ignore this email.</p>
          </div>
        `,
        subject: "Verify Your Email Address",
        to: user.email,
      });
    },
  },

  // Social providers configuration (optional)
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      enabled: !!(
        process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ),
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      enabled: !!(
        process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ),
    },
  },

  // User configuration
  user: {
    additionalFields: {
      firstName: {
        required: false,
        type: "string",
      },
      isActive: {
        defaultValue: true,
        required: false,
        type: "boolean",
      },
      lastName: {
        required: false,
        type: "string",
      },
      phone: {
        required: false,
        type: "string",
      },
      userRole: {
        defaultValue: "user",
        required: false,
        type: "string",
      },
    },
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

  // Rate limiting
  rateLimit: {
    max: 100, // 100 requests per minute
    window: 60, // 1 minute
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

// Note: auth is exported at the bottom of the file

// Define basic types for now - these will be inferred from the auth instance
export type Session = {
  expiresAt: Date;
  id: string;
  ipAddress?: string;
  token: string;
  userAgent?: string;
  userId: string;
};

export type User = {
  createdAt: Date;
  email: string;
  emailVerified: boolean;
  // Custom fields
  firstName?: string;
  id: string;
  image?: string;
  isActive: boolean;
  lastName?: string;
  name: string;
  phone?: string;
  updatedAt: Date;
  userRole: "admin" | "super_admin" | "user";
};
