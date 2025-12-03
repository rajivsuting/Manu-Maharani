import { index, integer, pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

import { Images } from './images.schema';
import { Resort } from './resort.schema';

export const galleryCategoryEnum = pgEnum("gallery_category", [
  "rooms",
  "dining",
  "spa",
  "activities",
  "facilities",
  "events",
  "surroundings",
  "general",
]);

export const galleryTypeEnum = pgEnum("gallery_type", ["image", "video"]);

export const Gallery = pgTable(
  "gallery",
  {
    id: serial("id").primaryKey(),
    resort_id: integer("resort_id")
      .references(() => Resort.id, { onDelete: "cascade" })
      .notNull(),

    description: text("description"),
    title: text("title").notNull(),

    image_id: integer("image_id").references(() => Images.id, {
      onDelete: "cascade",
    }),
    type: galleryTypeEnum("type").notNull().default("image"),
    video_thumbnail_id: integer("video_thumbnail_id").references(
      () => Images.id,
      { onDelete: "set null" }
    ),
    video_url: text("video_url"),

    category: galleryCategoryEnum("category").notNull().default("general"),

    is_featured: integer("is_featured").notNull().default(0),
    order: integer("order").notNull().default(0),

    created_at: timestamp("created_at", { precision: 0 }).defaultNow(),
    updated_at: timestamp("updated_at", { precision: 0 })
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("gallery_resort_id_idx").on(table.resort_id),
    index("gallery_type_idx").on(table.type),
    index("gallery_category_idx").on(table.category),
    index("gallery_is_featured_idx").on(table.is_featured),
  ]
);

export const insertGallerySchema = createInsertSchema(Gallery);

export type TGalleryBase = typeof Gallery.$inferSelect;
export type TGalleryCategory = (typeof galleryCategoryEnum.enumValues)[number];
export type TGalleryType = (typeof galleryTypeEnum.enumValues)[number];
export type TNewGallery = typeof Gallery.$inferInsert;
