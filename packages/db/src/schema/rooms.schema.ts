import {
    index, integer, pgEnum, pgTable, serial, text, timestamp, varchar
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { Resort } from './resort.schema';
import { RoomTypes } from './room-types.schema';

export const roomStatusEnum = pgEnum("room_status", [
  "available",
  "occupied",
  "maintenance",
  "blocked",
]);

export const Rooms = pgTable(
  "rooms",
  {
    id: serial("id").primaryKey(),
    resort_id: integer("resort_id")
      .references(() => Resort.id, { onDelete: "cascade" })
      .notNull(),
    room_type_id: integer("room_type_id")
      .references(() => RoomTypes.id, { onDelete: "cascade" })
      .notNull(),

    floor: integer("floor").notNull(),
    room_number: varchar("room_number", { length: 50 }).notNull().unique(),
    status: roomStatusEnum("status").default("available"),

    notes: text("notes"),

    created_at: timestamp("created_at", { precision: 0 }).defaultNow(),
    updated_at: timestamp("updated_at", { precision: 0 })
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("rooms_room_number_idx").on(table.room_number),
    index("rooms_resort_id_idx").on(table.resort_id),
    index("rooms_room_type_id_idx").on(table.room_type_id),
    index("rooms_status_idx").on(table.status),
    index("rooms_floor_idx").on(table.floor),
  ]
);

export const insertRoomSchema = createInsertSchema(Rooms, {
  floor: (floor) => floor.min(0, "Floor must be 0 or greater"),
  room_number: (room_number) =>
    room_number.min(1, "Room number is required").max(50),
});

export const selectRoomSchema = createSelectSchema(Rooms);

export type TNewRoom = typeof Rooms.$inferInsert;
export type TRoomBase = typeof Rooms.$inferSelect;
export type TRoomStatus = (typeof roomStatusEnum.enumValues)[number];
