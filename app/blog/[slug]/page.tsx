import Link from "next/link";
import { notFound } from "next/navigation";
import { SeoPageShell } from "@/components/seo/SeoPageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/portfolio";
import { blogSlug, getPostBySlug, getPublishedPosts } from "@/lib/blog";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildPageMetadata,
} from "@/lib/seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPublishedPosts().map((post) => ({
    slug: blogSlug(post),
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return buildPageMetadata({
      title: "Post not found",
      description: "The requested blog post could not be found.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${post.title} | ${siteConfig.name}`,
    description: post.excerpt,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.modified ?? post.date,
    authors: [siteConfig.name],
    tags: post.tags,
    keywords: [
      ...(post.tags ?? []),
      "Basit Khan",
      "Computer Science",
      "Wilfrid Laurier University",
    ],
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post?.body?.length) {
    notFound();
  }

  return (
    <SeoPageShell>
      <JsonLd
        data={[
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ]}
      />

      <article>
        <header className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-pink)]">
            Blog
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-white">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
            <span>By {siteConfig.name}</span>
            <time dateTime={post.date}>Published {post.date}</time>
            {post.modified ? (
              <time dateTime={post.modified}>Updated {post.modified}</time>
            ) : null}
            {post.readingTimeMinutes ? (
              <span>{post.readingTimeMinutes} min read</span>
            ) : null}
          </div>
          {post.tags?.length ? (
            <ul className="flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded bg-black/30 px-2 py-1 font-mono text-xs text-gray-400"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        <section className="mt-8 space-y-4 text-base leading-relaxed text-gray-300">
          {post.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </section>

        <footer className="mt-10 border-t border-white/10 pt-6">
          <p className="text-sm text-gray-400">
            Written by{" "}
            <Link href="/about" className="text-[var(--color-accent)]">
              {siteConfig.name}
            </Link>
            , {siteConfig.jobTitle.toLowerCase()} at{" "}
            {siteConfig.university.name}.
          </p>
          <ul className="mt-4 space-y-2 text-[var(--color-accent)]">
            <li>
              <Link href="/blog">← Back to blog</Link>
            </li>
            <li>
              <Link href="/projects">View projects</Link>
            </li>
            <li>
              <Link href="/contact">Contact {siteConfig.name}</Link>
            </li>
          </ul>
        </footer>
      </article>
    </SeoPageShell>
  );
}
