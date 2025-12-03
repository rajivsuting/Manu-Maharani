import {
    index, integer, numeric, pgEnum, pgTable, serial, text, timestamp
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { Amenities } from './amenities.schema';
import { Faqs } from './faqs.schema';
import { Images } from './images.schema';
import { Policies } from './policies.schema';
import { Resort } from './resort.schema';

export const roomTypeStatusEnum = pgEnum("room_type_status", [
  "active",
  "inactive",
]);

export const bedTypeEnum = pgEnum("bed_type", [
  "single",
  "double",
  "queen",
  "king",
  "twin",
]);

export const RoomTypes = pgTable(
  "room_types",
  {
    id: serial("id").primaryKey(),
    resort_id: integer("resort_id")
      .references(() => Resort.id, { onDelete: "cascade" })
      .notNull(),

    description: text("description").notNull(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),

    bed_type: bedTypeEnum("bed_type").notNull(),
    max_occupancy: integer("max_occupancy").notNull().default(2),
    number_of_beds: integer("number_of_beds").notNull().default(1),
    size_sqft: integer("size_sqft").notNull(),

    base_price: numeric("base_price", { precision: 10, scale: 2 })
      .notNull()
      .default("0"),
    peak_season_price: numeric("peak_season_price", {
      precision: 10,
      scale: 2,
    }),
    weekend_price: numeric("weekend_price", { precision: 10, scale: 2 }),

    is_featured: integer("is_featured").notNull().default(0),
    order: integer("order").notNull().default(0),
    status: roomTypeStatusEnum("status").default("active"),

    created_at: timestamp("created_at", { precision: 0 }).defaultNow(),
    updated_at: timestamp("updated_at", { precision: 0 })
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("room_types_slug_idx").on(table.slug),
    index("room_types_resort_id_idx").on(table.resort_id),
    index("room_types_status_idx").on(table.status),
    index("room_types_is_featured_idx").on(table.is_featured),
  ]
);

export const RoomTypeImages = pgTable("room_type_images", {
  id: serial("id").primaryKey(),
  image_id: integer("image_id")
    .references(() => Images.id, { onDelete: "cascade" })
    .notNull(),
  order: integer("order").notNull().default(0),
  room_type_id: integer("room_type_id")
    .references(() => RoomTypes.id, { onDelete: "cascade" })
    .notNull(),
});

export const RoomTypeAmenities = pgTable("room_type_amenities", {
  amenity_id: integer("amenity_id")
    .references(() => Amenities.id, { onDelete: "cascade" })
    .notNull(),
  id: serial("id").primaryKey(),
  order: integer("order").notNull().default(0),
  room_type_id: integer("room_type_id")
    .references(() => RoomTypes.id, { onDelete: "cascade" })
    .notNull(),
});

export const RoomTypePolicies = pgTable("room_type_policies", {
  id: serial("id").primaryKey(),
  order: integer("order").notNull().default(0),
  policy_id: integer("policy_id")
    .references(() => Policies.id, { onDelete: "cascade" })
    .notNull(),
  room_type_id: integer("room_type_id")
    .references(() => RoomTypes.id, { onDelete: "cascade" })
    .notNull(),
});

export const RoomTypeFaqs = pgTable("room_type_faqs", {
  faq_id: integer("faq_id")
    .references(() => Faqs.id, { onDelete: "cascade" })
    .notNull(),
  id: serial("id").primaryKey(),
  order: integer("order").notNull().default(0),
  room_type_id: integer("room_type_id")
    .references(() => RoomTypes.id, { onDelete: "cascade" })
    .notNull(),
});

export const insertRoomTypeSchema = createInsertSchema(RoomTypes, {
  max_occupancy: (max_occupancy) =>
    max_occupancy.min(1, "Maximum occupancy must be at least 1"),
  name: (name) => name.min(1, "Room type name is required").max(255),
  size_sqft: (size_sqft) =>
    size_sqft.min(1, "Room size must be at least 1 sq ft"),
});

export const selectRoomTypeSchema = createSelectSchema(RoomTypes);

export type TBedType = (typeof bedTypeEnum.enumValues)[number];
export type TNewRoomType = typeof RoomTypes.$inferInsert;
export type TNewRoomTypeAmenity = typeof RoomTypeAmenities.$inferInsert;
export type TNewRoomTypeFaq = typeof RoomTypeFaqs.$inferInsert;

export type TNewRoomTypeImage = typeof RoomTypeImages.$inferInsert;
export type TNewRoomTypePolicy = typeof RoomTypePolicies.$inferInsert;

export type TRoomTypeAmenityBase = typeof RoomTypeAmenities.$inferSelect;
export type TRoomTypeBase = typeof RoomTypes.$inferSelect;

export type TRoomTypeFaqBase = typeof RoomTypeFaqs.$inferSelect;
export type TRoomTypeImageBase = typeof RoomTypeImages.$inferSelect;

export type TRoomTypePolicyBase = typeof RoomTypePolicies.$inferSelect;
export type TRoomTypeStatus = (typeof roomTypeStatusEnum.enumValues)[number];

export const BED_TYPE_DESCRIPTIONS = {
  double: "Double bed (135cm x 190cm)",
  king: "King bed (180cm x 200cm)",
  queen: "Queen bed (150cm x 200cm)",
  single: "Single bed (90cm x 190cm)",
  twin: "Two single beds",
} as const;
