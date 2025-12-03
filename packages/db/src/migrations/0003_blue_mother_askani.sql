CREATE TABLE "email_verification_token" (
	"created_at" timestamp NOT NULL,
	"email" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "email_verification_token_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "two_factor_token" (
	"created_at" timestamp NOT NULL,
	"expires_at" timestamp NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_audit_log" (
	"action" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"details" text,
	"id" serial PRIMARY KEY NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE "user_preferences" (
	"created_at" timestamp NOT NULL,
	"email_notifications" boolean DEFAULT true,
	"id" text PRIMARY KEY NOT NULL,
	"language" text DEFAULT 'en',
	"push_notifications" boolean DEFAULT false,
	"theme" text DEFAULT 'system',
	"timezone" text DEFAULT 'UTC',
	"two_factor_enabled" boolean DEFAULT false,
	"updated_at" timestamp NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "user_preferences_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "emailVerificationToken" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "twoFactorToken" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "userAuditLog" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "userPreferences" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "emailVerificationToken" CASCADE;--> statement-breakpoint
DROP TABLE "twoFactorToken" CASCADE;--> statement-breakpoint
DROP TABLE "userAuditLog" CASCADE;--> statement-breakpoint
DROP TABLE "userPreferences" CASCADE;--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "passwordResetToken" DROP CONSTRAINT "passwordResetToken_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "access_aoken" text;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "access_token_expires_at" timestamp;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "account_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "id_token" text;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "provider_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "refresh_token" text;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "refresh_token_expires_at" timestamp;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "passwordResetToken" ADD COLUMN "created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "passwordResetToken" ADD COLUMN "expires_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "passwordResetToken" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "expires_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "ip_address" text;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "user_agent" text;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "email_verified" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "verification" ADD COLUMN "created_at" timestamp;--> statement-breakpoint
ALTER TABLE "verification" ADD COLUMN "expires_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "verification" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "email_verification_token" ADD CONSTRAINT "email_verification_token_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "two_factor_token" ADD CONSTRAINT "two_factor_token_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_audit_log" ADD CONSTRAINT "user_audit_log_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "passwordResetToken" ADD CONSTRAINT "passwordResetToken_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN "accountId";--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN "providerId";--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN "userId";--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN "accessToken";--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN "refreshToken";--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN "idToken";--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN "accessTokenExpiresAt";--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN "refreshTokenExpiresAt";--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN "createdAt";--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN "updatedAt";--> statement-breakpoint
ALTER TABLE "passwordResetToken" DROP COLUMN "userId";--> statement-breakpoint
ALTER TABLE "passwordResetToken" DROP COLUMN "expiresAt";--> statement-breakpoint
ALTER TABLE "passwordResetToken" DROP COLUMN "createdAt";--> statement-breakpoint
ALTER TABLE "session" DROP COLUMN "expiresAt";--> statement-breakpoint
ALTER TABLE "session" DROP COLUMN "createdAt";--> statement-breakpoint
ALTER TABLE "session" DROP COLUMN "updatedAt";--> statement-breakpoint
ALTER TABLE "session" DROP COLUMN "ipAddress";--> statement-breakpoint
ALTER TABLE "session" DROP COLUMN "userAgent";--> statement-breakpoint
ALTER TABLE "session" DROP COLUMN "userId";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "emailVerified";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "createdAt";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "updatedAt";--> statement-breakpoint
ALTER TABLE "verification" DROP COLUMN "expiresAt";--> statement-breakpoint
ALTER TABLE "verification" DROP COLUMN "createdAt";--> statement-breakpoint
ALTER TABLE "verification" DROP COLUMN "updatedAt";