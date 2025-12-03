"use server";
import { and, count, eq, ilike } from "@repo/db";
import { db, RoomTypes } from "@repo/db";
import type { TNewRoomType, TRoomType } from "@repo/db";

import { getOrSet, bumpVersion } from "./libs/cache";
import { roomTypeBySlugKey, roomTypesListKey } from "./libs/keys";

type TGetRoomTypesFilters = {
  search?: string;
  page?: number;
  limit?: number;
  status?: "active" | "inactive";
  resort_id?: number;
};

export const getRoomTypes = async (filters: TGetRoomTypesFilters = {}) => {
  if (!db) return { roomTypes: [], total: 0 };

  const conditions = [];
  
  if (filters.search) {
    conditions.push(ilike(RoomTypes.name, `%${filters.search}%`));
  }
  
  if (filters.status) {
    conditions.push(eq(RoomTypes.status, filters.status));
  }
  
  if (filters.resort_id) {
    conditions.push(eq(RoomTypes.resort_id, filters.resort_id));
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(RoomTypes)
    .where(where);

  const page = Math.max(1, filters.page || 1);
  const limit = Math.max(1, filters.limit || 10);
  const offset = (page - 1) * limit;

  const roomTypes = await db.query.RoomTypes.findMany({
    where,
    limit,
    offset,
    with: {
      resort: true,
      images: {
        with: { image: true },
        orderBy: (images, { asc }) => [asc(images.order)],
      },
      amenities: {
        with: { amenity: true },
        orderBy: (amenities, { asc }) => [asc(amenities.order)],
      },
      policies: {
        with: { policy: true },
        orderBy: (policies, { asc }) => [asc(policies.order)],
      },
      faqs: {
        with: { faq: true },
        orderBy: (faqs, { asc }) => [asc(faqs.order)],
      },
    },
    orderBy: (roomTypes, { asc }) => [asc(roomTypes.order)],
  });

  return {
    roomTypes: roomTypes as unknown as TRoomType[],
    total,
  };
};

export const getRoomTypeBySlug = async (slug: string) => {
  if (!db) return null;

  return getOrSet(
    () =>
      db!.query.RoomTypes.findFirst({
        where: eq(RoomTypes.slug, slug),
        with: {
          resort: true,
          images: {
            with: { image: true },
            orderBy: (images, { asc }) => [asc(images.order)],
          },
          amenities: {
            with: { amenity: true },
            orderBy: (amenities, { asc }) => [asc(amenities.order)],
          },
          policies: {
            with: { policy: true },
            orderBy: (policies, { asc }) => [asc(policies.order)],
          },
          faqs: {
            with: { faq: true },
            orderBy: (faqs, { asc }) => [asc(faqs.order)],
          },
        },
      }),
    {
      key: await roomTypeBySlugKey(slug),
    }
  );
};

export const createRoomType = async (data: TNewRoomType) => {
  if (!db) throw new Error("Database connection not available");

  const [roomType] = await db.insert(RoomTypes).values(data).returning();
  
  await bumpVersion("room-types");
  
  return roomType;
};

export const updateRoomType = async (
  id: number,
  data: Partial<TNewRoomType>
) => {
  if (!db) throw new Error("Database connection not available");

  const [updated] = await db
    .update(RoomTypes)
    .set({ ...data, updated_at: new Date() })
    .where(eq(RoomTypes.id, id))
    .returning();
  
  await bumpVersion("room-types");
  
  return updated;
};

export const getRoomTypeById = async (id: number) => {
  if (!db) return null;

  return db.query.RoomTypes.findFirst({
    where: eq(RoomTypes.id, id),
    with: {
      resort: true,
      images: {
        with: { image: true },
        orderBy: (images, { asc }) => [asc(images.order)],
      },
      amenities: {
        with: { amenity: true },
        orderBy: (amenities, { asc }) => [asc(amenities.order)],
      },
      policies: {
        with: { policy: true },
        orderBy: (policies, { asc }) => [asc(policies.order)],
      },
      faqs: {
        with: { faq: true },
        orderBy: (faqs, { asc }) => [asc(faqs.order)],
      },
    },
  });
};

export const deleteRoomType = async (id: number) => {
  if (!db) throw new Error("Database connection not available");

  await db.delete(RoomTypes).where(eq(RoomTypes.id, id));
  
  await bumpVersion("room-types");
};

