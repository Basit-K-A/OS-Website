import { blogPosts, type BlogPost } from "@/data/portfolio";

const WORDS_PER_MINUTE = 200;

export function blogSlug(post: BlogPost): string {
  return post.slug ?? post.id.toLowerCase().replace(/\s+/g, "-");
}

export function getPublishedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.body?.length);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPublishedPosts().find((post) => blogSlug(post) === slug);
}

export function getReadingTimeMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function enrichPost(post: BlogPost): BlogPost {
  if (!post.body?.length) return post;

  const readingTimeMinutes =
    post.readingTimeMinutes ??
    getReadingTimeMinutes(post.body.join(" "));

  return { ...post, readingTimeMinutes };
}
