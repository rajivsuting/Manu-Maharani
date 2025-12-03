import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const Amenities = pgTable("amenities", {
  icon: text("icon").notNull(),
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
});

export const insertAmenitiesSchema = createInsertSchema(Amenities);

export type TAmenityBase = typeof Amenities.$inferSelect;
export type TInsertAmenity = typeof insertAmenitiesSchema;
export type TNewAmenity = typeof Amenities.$inferInsert;
