import { index, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const Images = pgTable(
  "images",
  {
    alt_text: text("alt_text").notNull().default(""),
    created_at: timestamp("created_at", { precision: 0 }).defaultNow(),
    id: serial("id").primaryKey(),
    large_url: text("large_url").notNull(),
    medium_url: text("medium_url").notNull(),
    original_url: text("original_url").notNull(),
    small_url: text("small_url").notNull(),
    updated_at: timestamp("updated_at", { precision: 0 })
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("images_created_at_idx").on(table.created_at)]
);

export const insertImageSchema = createInsertSchema(Images);
export const selectImageSchema = createSelectSchema(Images);

export type TImage = typeof Images.$inferSelect;
export type TNewImage = typeof Images.$inferInsert;
