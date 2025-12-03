"use server";
import { and, count, eq, ilike } from "@repo/db";
import { db, Blogs } from "@repo/db";
import type { TNewBlog, TBlog } from "@repo/db";

import { getOrSet, bumpVersion } from "./libs/cache";
import { blogBySlugKey, featuredBlogsKey } from "./libs/keys";

type TGetBlogsFilters = {
  search?: string;
  page?: number;
  limit?: number;
  status?: "draft" | "published" | "archived";
  category?: string;
  is_featured?: boolean;
};

export const getBlogs = async (filters: TGetBlogsFilters = {}) => {
  if (!db) return { blogs: [], total: 0 };

  const conditions = [];
  
  if (filters.search) {
    conditions.push(ilike(Blogs.title, `%${filters.search}%`));
  }
  
  if (filters.status) {
    conditions.push(eq(Blogs.status, filters.status));
  }
  
  if (filters.category) {
    conditions.push(eq(Blogs.category, filters.category as any));
  }
  
  if (filters.is_featured !== undefined) {
    conditions.push(eq(Blogs.is_featured, filters.is_featured ? 1 : 0));
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(Blogs)
    .where(where);

  const page = Math.max(1, filters.page || 1);
  const limit = Math.max(1, filters.limit || 10);
  const offset = (page - 1) * limit;

  const blogs = await db.query.Blogs.findMany({
    where,
    limit,
    offset,
    with: {
      author: true,
      featuredImage: true,
      images: {
        with: { image: true },
        orderBy: (images, { asc }) => [asc(images.order)],
      },
    },
    orderBy: (blogs, { desc }) => [desc(blogs.published_at)],
  });

  return {
    blogs: blogs as unknown as TBlog[],
    total,
  };
};

export const getBlogBySlug = async (slug: string) => {
  if (!db) return null;

  return getOrSet(
    () =>
      db!.query.Blogs.findFirst({
        where: and(eq(Blogs.slug, slug), eq(Blogs.status, "published")),
        with: {
          author: true,
          featuredImage: true,
          images: {
            with: { image: true },
            orderBy: (images, { asc }) => [asc(images.order)],
          },
        },
      }),
    {
      key: await blogBySlugKey(slug),
    }
  );
};

export const getFeaturedBlogs = async (limit: number = 3) => {
  if (!db) return [];

  return getOrSet(
    () =>
      db!.query.Blogs.findMany({
        where: and(
          eq(Blogs.status, "published"),
          eq(Blogs.is_featured, 1)
        ),
        limit,
        with: {
          author: true,
          featuredImage: true,
        },
        orderBy: (blogs, { desc }) => [desc(blogs.published_at)],
      }),
    {
      key: await featuredBlogsKey(),
    }
  );
};

export const createBlog = async (data: TNewBlog) => {
  if (!db) throw new Error("Database connection not available");

  const [blog] = await db.insert(Blogs).values(data).returning();
  
  await bumpVersion("blogs");
  
  return blog;
};

export const updateBlog = async (id: number, data: Partial<TNewBlog>) => {
  if (!db) throw new Error("Database connection not available");

  const [updated] = await db
    .update(Blogs)
    .set({ ...data, updated_at: new Date() })
    .where(eq(Blogs.id, id))
    .returning();
  
  await bumpVersion("blogs");
  
  return updated;
};

export const getBlogById = async (id: number) => {
  if (!db) return null;

  return db.query.Blogs.findFirst({
    where: eq(Blogs.id, id),
    with: {
      author: true,
      featuredImage: true,
      images: {
        with: { image: true },
        orderBy: (images, { asc }) => [asc(images.order)],
      },
    },
  });
};

export const incrementBlogViewCount = async (id: number) => {
  if (!db) return;

  const blog = await db.query.Blogs.findFirst({
    where: eq(Blogs.id, id),
  });
  
  if (blog) {
    await db
      .update(Blogs)
      .set({ view_count: blog.view_count + 1 })
      .where(eq(Blogs.id, id));
  }
};

export const deleteBlog = async (id: number) => {
  if (!db) throw new Error("Database connection not available");

  await db.delete(Blogs).where(eq(Blogs.id, id));
  
  await bumpVersion("blogs");
};

