import Link from "next/link";
import { SeoPageShell } from "@/components/seo/SeoPageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPosts, siteConfig } from "@/data/portfolio";
import { blogSlug, getPublishedPosts } from "@/lib/blog";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: `Blog | ${siteConfig.name}`,
  description: `Articles by ${siteConfig.name} on computer science, software engineering, learning, and building real-world projects at ${siteConfig.university.shortName}.`,
  path: "/blog",
  keywords: [
    "Basit Khan Blog",
    "Computer Science Blog",
    "Software Engineering",
    "Wilfrid Laurier University",
  ],
});

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <SeoPageShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <article>
        <header className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-pink)]">
            Blog
          </p>
          <h1 className="text-3xl font-semibold text-white">
            {siteConfig.name}&apos;s Blog
          </h1>
          <p className="text-base text-gray-300">
            Writing about computer science, software engineering, and learning
            by building.
          </p>
        </header>

        <section className="mt-8">
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="rounded border border-white/10 bg-white/[0.03] p-5"
              >
                <h2 className="text-xl font-semibold text-white">
                  <Link href={`/blog/${blogSlug(post)}`}>{post.title}</Link>
                </h2>
                <p className="mt-2 text-sm text-gray-400">{post.excerpt}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <time dateTime={post.date}>{post.date}</time>
                  {post.readingTimeMinutes ? (
                    <span>{post.readingTimeMinutes} min read</span>
                  ) : null}
                </div>
                {post.tags?.length ? (
                  <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tags">
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
              </li>
            ))}
          </ul>
        </section>

        {blogPosts.length > posts.length ? (
          <p className="mt-6 text-sm text-gray-500">
            Additional posts are coming soon.
          </p>
        ) : null}

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white">Related pages</h2>
          <ul className="mt-4 space-y-2 text-[var(--color-accent)]">
            <li>
              <Link href="/about">About {siteConfig.name}</Link>
            </li>
            <li>
              <Link href="/projects">View projects</Link>
            </li>
          </ul>
        </section>
      </article>
    </SeoPageShell>
  );
}
