"use server";
import { db, Amenities, Policies, Faqs } from "@repo/db";
import type { TNewAmenity, TNewPolicy, TNewFaq } from "@repo/db";
import { eq } from "@repo/db";

export const getAmenities = async () => {
  if (!db) return [];

  return db.query.Amenities.findMany({
    orderBy: (amenities, { asc }) => [asc(amenities.label)],
  });
};

export const createAmenity = async (data: TNewAmenity) => {
  if (!db) throw new Error("Database connection not available");

  const [amenity] = await db.insert(Amenities).values(data).returning();
  
  return amenity;
};

export const updateAmenity = async (id: number, data: Partial<TNewAmenity>) => {
  if (!db) throw new Error("Database connection not available");

  const [updated] = await db
    .update(Amenities)
    .set(data)
    .where(eq(Amenities.id, id))
    .returning();
  
  return updated;
};

export const deleteAmenity = async (id: number) => {
  if (!db) throw new Error("Database connection not available");

  await db.delete(Amenities).where(eq(Amenities.id, id));
};

export const getPolicies = async () => {
  if (!db) return [];

  return db.query.Policies.findMany({
    orderBy: (policies, { asc }) => [asc(policies.label)],
  });
};

export const getPoliciesByKind = async (kind: "include" | "exclude") => {
  if (!db) return [];

  return db.query.Policies.findMany({
    where: eq(Policies.kind, kind),
    orderBy: (policies, { asc }) => [asc(policies.label)],
  });
};

export const createPolicy = async (data: TNewPolicy) => {
  if (!db) throw new Error("Database connection not available");

  const [policy] = await db.insert(Policies).values(data).returning();
  
  return policy;
};

export const updatePolicy = async (id: number, data: Partial<TNewPolicy>) => {
  if (!db) throw new Error("Database connection not available");

  const [updated] = await db
    .update(Policies)
    .set(data)
    .where(eq(Policies.id, id))
    .returning();
  
  return updated;
};

export const deletePolicy = async (id: number) => {
  if (!db) throw new Error("Database connection not available");

  await db.delete(Policies).where(eq(Policies.id, id));
};

export const getFaqs = async () => {
  if (!db) return [];

  return db.query.Faqs.findMany();
};

export const createFaq = async (data: TNewFaq) => {
  if (!db) throw new Error("Database connection not available");

  const [faq] = await db.insert(Faqs).values(data).returning();
  
  return faq;
};

export const updateFaq = async (id: number, data: Partial<TNewFaq>) => {
  if (!db) throw new Error("Database connection not available");

  const [updated] = await db
    .update(Faqs)
    .set(data)
    .where(eq(Faqs.id, id))
    .returning();
  
  return updated;
};

export const deleteFaq = async (id: number) => {
  if (!db) throw new Error("Database connection not available");

  await db.delete(Faqs).where(eq(Faqs.id, id));
};

