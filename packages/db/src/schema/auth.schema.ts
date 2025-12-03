import {
    boolean, index, pgEnum, pgTable, serial, text, timestamp, uniqueIndex, varchar
} from 'drizzle-orm/pg-core';

export const userRoles = pgEnum("user_roles", ["user", "admin", "super_admin"]);

// Users table for better-auth
export const Users = pgTable(
  "user",
  {
    createdAt: timestamp("created_at").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").notNull().default(false),
    id: text("id").primaryKey(),
    image: text("image"),
    name: text("name").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    // Custom fields
    firstName: varchar("first_name", { length: 225 }),
    isActive: boolean("is_active").notNull().default(true),
    lastName: varchar("last_name", { length: 225 }),
    phone: varchar("phone", { length: 255 }).unique(),
    userRole: userRoles("user_role").notNull().default("user"),
  },
  (table) => [
    uniqueIndex("email_unique").on(table.email),
    index("phone_unique").on(table.phone),
    index("role_unique").on(table.userRole),
    index("user_name_index").on(table.firstName, table.lastName),
  ]
);

// Sessions table for better-auth
export const Sessions = pgTable("session", {
  createdAt: timestamp("created_at").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  id: text("id").primaryKey(),
  ipAddress: text("ip_address"),
  token: text("token").notNull().unique(),
  updatedAt: timestamp("updated_at").notNull(),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => Users.id),
});

// Accounts table for better-auth (OAuth providers)
export const Accounts = pgTable("account", {
  accessToken: text("access_aoken"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  accountId: text("account_id").notNull(),
  createdAt: timestamp("created_at").notNull(),
  id: text("id").primaryKey(),
  idToken: text("id_token"),
  password: text("password"),
  providerId: text("provider_id").notNull(),
  refreshToken: text("refresh_token"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  updatedAt: timestamp("updated_at").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => Users.id),
});

// Verification tokens table for better-auth
export const Verifications = pgTable("verification", {
  createdAt: timestamp("created_at"),
  expiresAt: timestamp("expires_at").notNull(),
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  updatedAt: timestamp("updated_at"),
  value: text("value").notNull(),
});

// Password reset tokens
export const PasswordResetTokens = pgTable("passwordResetToken", {
  createdAt: timestamp("created_at").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  id: text("id").primaryKey(),
  token: text("token").notNull().unique(),
  userId: text("user_id")
    .notNull()
    .references(() => Users.id),
});

// Email verification tokens
export const EmailVerificationTokens = pgTable("email_verification_token", {
  createdAt: timestamp("created_at").notNull(),
  email: text("email").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  id: text("id").primaryKey(),
  token: text("token").notNull().unique(),
  userId: text("user_id")
    .notNull()
    .references(() => Users.id),
});

// Two-factor authentication
export const TwoFactorTokens = pgTable("two_factor_token", {
  createdAt: timestamp("created_at").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  id: text("id").primaryKey(),
  token: text("token").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => Users.id),
});

// User preferences/settings
export const UserPreferences = pgTable("user_preferences", {
  createdAt: timestamp("created_at").notNull(),
  emailNotifications: boolean("email_notifications").default(true),
  id: text("id").primaryKey(),
  language: text("language").default("en"),
  pushNotifications: boolean("push_notifications").default(false),
  theme: text("theme").default("system"),
  timezone: text("timezone").default("UTC"),
  twoFactorEnabled: boolean("two_factor_enabled").default(false),
  updatedAt: timestamp("updated_at").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => Users.id)
    .unique(),
});

// Audit log for user actions
export const UserAuditLog = pgTable("user_audit_log", {
  action: text("action").notNull(), // e.g., "login", "logout", "password_change", "profile_update"
  createdAt: timestamp("created_at").notNull(),
  details: text("details"), // JSON string with additional details
  id: serial("id").primaryKey(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").references(() => Users.id),
});

export type TAccount = typeof Accounts.$inferSelect;
// Type exports
export type TNewUser = typeof Users.$inferInsert;
export type TSession = typeof Sessions.$inferSelect;
export type TUser = typeof Users.$inferSelect;
export type TUserAuditLog = typeof UserAuditLog.$inferSelect;
export type TUserPreferences = typeof UserPreferences.$inferSelect;
export type TUserRole = (typeof userRoles.enumValues)[number];
export type TVerification = typeof Verifications.$inferSelect;
