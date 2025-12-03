"use server";
import { eq } from "@repo/db";
import { db, Resort, ResortImages, Images } from "@repo/db";
import type { TNewResort, TResort } from "@repo/db";

import { getOrSet, bumpVersion } from "./libs/cache";
import { resortBySlugKey } from "./libs/keys";

export const getResortBySlug = async (slug: string) => {
  if (!db) return null;

  return getOrSet(
    () =>
      db!.query.Resort.findFirst({
        where: eq(Resort.slug, slug),
        with: {
          images: {
            with: { image: true },
            orderBy: (images, { asc }) => [asc(images.order)],
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
      key: await resortBySlugKey(slug),
    }
  );
};

export const createResort = async (data: TNewResort) => {
  if (!db) throw new Error("Database connection not available");

  const [resort] = await db.insert(Resort).values(data).returning();
  
  await bumpVersion("resort");
  
  return resort;
};

export const updateResort = async (id: number, data: Partial<TNewResort>) => {
  if (!db) throw new Error("Database connection not available");

  const [updated] = await db
    .update(Resort)
    .set({ ...data, updated_at: new Date() })
    .where(eq(Resort.id, id))
    .returning();
  
  await bumpVersion("resort");
  
  return updated;
};

export const getResortById = async (id: number) => {
  if (!db) return null;

  return db.query.Resort.findFirst({
    where: eq(Resort.id, id),
    with: {
      images: {
        with: { image: true },
        orderBy: (images, { asc }) => [asc(images.order)],
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

