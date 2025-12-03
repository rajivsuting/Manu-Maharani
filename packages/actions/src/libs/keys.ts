import { getVersion } from "./cache";

export async function resortBySlugKey(slug: string): Promise<string> {
  const v = await getVersion("resort");
  return `resort:slug:${slug}:v${v}`;
}

export async function roomTypeBySlugKey(slug: string): Promise<string> {
  const v = await getVersion("room-types");
  return `room-type:slug:${slug}:v${v}`;
}

export async function roomTypesListKey(): Promise<string> {
  const v = await getVersion("room-types");
  return `room-types:list:v${v}`;
}

export async function blogBySlugKey(slug: string): Promise<string> {
  const v = await getVersion("blogs");
  return `blog:slug:${slug}:v${v}`;
}

export async function featuredBlogsKey(): Promise<string> {
  const v = await getVersion("blogs");
  return `blogs:featured:v${v}`;
}

export async function testimonialsKey(): Promise<string> {
  const v = await getVersion("testimonials");
  return `testimonials:approved:v${v}`;
}

export async function galleryKey(category?: string): Promise<string> {
  const v = await getVersion("gallery");
  return category ? `gallery:${category}:v${v}` : `gallery:all:v${v}`;
}

