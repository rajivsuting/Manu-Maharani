import {
    index, integer, pgEnum, pgTable, serial, text, timestamp, varchar
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

import { Users } from './auth.schema';
import { Images } from './images.schema';
import { Resort } from './resort.schema';

export const testimonialStatusEnum = pgEnum("testimonial_status", [
  "pending",
  "approved",
  "rejected",
]);

export const Testimonials = pgTable(
  "testimonials",
  {
    id: serial("id").primaryKey(),
    resort_id: integer("resort_id")
      .references(() => Resort.id, { onDelete: "cascade" })
      .notNull(),

    guest_avatar_id: integer("guest_avatar_id").references(() => Images.id, {
      onDelete: "set null",
    }),
    guest_email: varchar("guest_email", { length: 255 }),
    guest_location: text("guest_location"),
    guest_name: text("guest_name").notNull(),

    user_id: text("user_id").references(() => Users.id, {
      onDelete: "set null",
    }),

    content: text("content").notNull(),
    rating: integer("rating").notNull(),
    title: text("title"),

    platform: text("platform").default("website"),
    stay_date: timestamp("stay_date"),

    is_featured: integer("is_featured").notNull().default(0),
    status: testimonialStatusEnum("status").notNull().default("pending"),

    admin_notes: text("admin_notes"),

    created_at: timestamp("created_at", { precision: 0 }).defaultNow(),
    updated_at: timestamp("updated_at", { precision: 0 })
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("testimonials_resort_id_idx").on(table.resort_id),
    index("testimonials_user_id_idx").on(table.user_id),
    index("testimonials_status_idx").on(table.status),
    index("testimonials_rating_idx").on(table.rating),
    index("testimonials_is_featured_idx").on(table.is_featured),
  ]
);

export const insertTestimonialSchema = createInsertSchema(Testimonials, {
  content: (content) =>
    content.min(10, "Review must be at least 10 characters"),
  guest_name: (guest_name) => guest_name.min(1, "Guest name is required"),
  rating: (rating) => rating.min(1).max(5),
});

export type TNewTestimonial = typeof Testimonials.$inferInsert;
export type TTestimonialBase = typeof Testimonials.$inferSelect;
export type TTestimonialStatus =
  (typeof testimonialStatusEnum.enumValues)[number];
