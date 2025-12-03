"use server";
import { db, Images } from "@repo/db";
import type { TNewImage } from "@repo/db";
import { eq, inArray } from "@repo/db";

export const createImages = async (images: TNewImage[]) => {
  if (!db) throw new Error("Database connection not available");

  const created = await db.insert(Images).values(images).returning();
  
  return created;
};

export const createImage = async (image: TNewImage) => {
  if (!db) throw new Error("Database connection not available");

  const [created] = await db.insert(Images).values(image).returning();
  
  return created;
};

export const deleteImages = async (imageIds: number[]) => {
  if (!db) throw new Error("Database connection not available");

  await db.delete(Images).where(inArray(Images.id, imageIds));
};

export const deleteImage = async (imageId: number) => {
  if (!db) throw new Error("Database connection not available");

  await db.delete(Images).where(eq(Images.id, imageId));
};

export const updateImageAltText = async (imageId: number, altText: string) => {
  if (!db) throw new Error("Database connection not available");

  const [updated] = await db
    .update(Images)
    .set({ alt_text: altText })
    .where(eq(Images.id, imageId))
    .returning();
  
  return updated;
};

export const getImageById = async (imageId: number) => {
  if (!db) return null;

  return db.query.Images.findFirst({
    where: eq(Images.id, imageId),
  });
};

