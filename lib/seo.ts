import type { Metadata } from "next";
import {
  blogPosts,
  siteConfig,
  type BlogPost,
} from "@/data/portfolio";
import { blogSlug, getPublishedPosts } from "@/lib/blog";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://basitkhan.ca";

export const seoKeywords = [
  "Basit Khan",
  "Computer Science",
  "Wilfrid Laurier University",
  "WLU",
  "Software Engineer",
  "Backend Developer",
  "Portfolio",
];

const defaultDescription =
  "Computer Science student at Wilfrid Laurier University interested in software engineering, backend development, cloud infrastructure, and building real-world software projects.";

type PageMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  noIndex?: boolean;
};

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized}`;
}

export function buildPageMetadata({
  title,
  description = defaultDescription,
  path = "/",
  keywords = seoKeywords,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const isArticle = type === "article";

  return {
    title,
    description,
    keywords,
    authors: authors?.map((name) => ({ name })) ?? [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: isArticle ? "article" : "website",
      locale: "en_CA",
      url,
      siteName: `${siteConfig.name} Portfolio`,
      title,
      description,
      publishedTime,
      modifiedTime,
      authors,
      tags,
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.jobTitle} at ${siteConfig.university.shortName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
    category: "technology",
  };
}

export const homeMetadata = buildPageMetadata({
  title: "Basit Khan | Computer Science Student at Wilfrid Laurier University",
  description: defaultDescription,
  path: "/",
});

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    givenName: "Basit",
    familyName: "Khan",
    jobTitle: siteConfig.jobTitle,
    description: defaultDescription,
    url: siteUrl,
    email: siteConfig.email,
    image: absoluteUrl("/opengraph-image"),
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: siteConfig.university.name,
      alternateName: siteConfig.university.shortName,
      url: siteConfig.university.url,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: siteConfig.university.name,
      alternateName: siteConfig.university.shortName,
      url: siteConfig.university.url,
    },
    knowsAbout: [
      "Software Engineering",
      "Backend Development",
      "Cloud Infrastructure",
      "TypeScript",
      "React",
      "Next.js",
      "Computer Science",
    ],
    sameAs: [
      siteConfig.github,
      siteConfig.linkedin,
      siteConfig.instagram,
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} Portfolio`,
    alternateName: "portfolioOS",
    url: siteUrl,
    description: defaultDescription,
    inLanguage: "en-CA",
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(post: BlogPost) {
  const slug = blogSlug(post);
  const url = absoluteUrl(`/blog/${slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.modified ?? post.date,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteUrl,
      sameAs: [siteConfig.github, siteConfig.linkedin],
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    image: absoluteUrl("/opengraph-image"),
    keywords: post.tags?.join(", "),
    articleSection: "Blog",
    inLanguage: "en-CA",
    wordCount: post.body?.join(" ").split(/\s+/).length ?? 0,
    timeRequired: post.readingTimeMinutes
      ? `PT${post.readingTimeMinutes}M`
      : undefined,
  };
}

type SitemapEntry = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  lastModified?: string;
};

export function getSitemapEntries(): SitemapEntry[] {
  const staticRoutes: SitemapEntry[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/experience", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
  ];

  const blogRoutes: SitemapEntry[] = getPublishedPosts().map((post) => ({
    path: `/blog/${blogSlug(post)}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
    lastModified: post.modified ?? post.date,
  }));

  return [...staticRoutes, ...blogRoutes];
}
