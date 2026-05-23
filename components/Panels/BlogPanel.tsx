"use client";

import { useState } from "react";
import { blogPosts, type BlogPost } from "@/data/portfolio";

function BlogPostView({
  post,
  onBack,
}: {
  post: BlogPost;
  onBack: () => void;
}) {
  return (
    <article className="space-y-3">
      <button
        type="button"
        onClick={onBack}
        className="font-mono text-xs text-[var(--color-accent)] os-link hover:underline"
      >
        ← cd ~/blog
      </button>
      <header>
        <p className="font-mono text-xs tracking-widest text-[var(--color-accent-pink)] uppercase">
          ~/blog/{post.id}.md
        </p>
        <h2 className="mt-1 text-lg font-semibold leading-snug text-white">
          {post.title}
        </h2>
        <time className="mt-1 block font-mono text-[10px] text-gray-500">
          {post.date}
        </time>
      </header>
      <div className="space-y-3 border-t border-white/10 pt-3">
        {post.body?.map((paragraph, index) => (
          <p key={index} className="text-sm leading-relaxed text-gray-300">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}

export function BlogPanel() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activePost = blogPosts.find((post) => post.id === activeId);

  if (activePost?.body) {
    return <BlogPostView post={activePost} onBack={() => setActiveId(null)} />;
  }

  return (
    <div className="space-y-3">
      <header>
        <p className="font-mono text-xs tracking-widest text-[var(--color-accent-pink)] uppercase">
          ~/blog
        </p>
        <h2 className="mt-1 text-lg font-semibold text-white">Latest posts</h2>
      </header>
      <ul className="space-y-2">
        {blogPosts.map((post) => {
          const hasBody = Boolean(post.body?.length);
          return (
            <li key={post.id}>
              {hasBody ? (
                <button
                  type="button"
                  onClick={() => setActiveId(post.id)}
                  className="block w-full rounded border border-transparent px-2 py-2 text-left os-link hover:border-white/10 hover:bg-white/[0.03]"
                >
                  <PostListItem post={post} />
                </button>
              ) : (
                <div className="rounded border border-white/5 px-2 py-2 opacity-60">
                  <PostListItem post={post} />
                  <p className="mt-1 font-mono text-[10px] text-gray-600">
                    coming soon
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PostListItem({ post }: { post: BlogPost }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-gray-100">{post.title}</span>
        <span className="shrink-0 font-mono text-[10px] text-gray-500">
          {post.date}
        </span>
      </div>
      <p className="mt-0.5 text-xs text-gray-400">{post.excerpt}</p>
    </>
  );
}
