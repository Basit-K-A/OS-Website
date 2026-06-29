import Link from "next/link";
import { SeoPageShell } from "@/components/seo/SeoPageShell";
import { siteConfig } from "@/data/portfolio";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: `Contact ${siteConfig.name} | Software Engineer Portfolio`,
  description: `Contact ${siteConfig.name}, a Computer Science student at ${siteConfig.university.name}. Reach out via email, GitHub, or LinkedIn.`,
  path: "/contact",
  keywords: [
    "Contact Basit Khan",
    "Basit Khan Email",
    "Basit Khan LinkedIn",
    "Basit Khan GitHub",
  ],
});

const contactLinks = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    label: "GitHub",
    value: "github.com/Basit-K-A",
    href: siteConfig.github,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/basit-khan-202616247",
    href: siteConfig.linkedin,
  },
  {
    label: "Instagram",
    value: "instagram.com/basit.o55",
    href: siteConfig.instagram,
  },
];

export default function ContactPage() {
  return (
    <SeoPageShell>
      <article>
        <header className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-pink)]">
            Contact
          </p>
          <h1 className="text-3xl font-semibold text-white">
            Contact {siteConfig.name}
          </h1>
          <p className="text-base text-gray-300">
            Reach out about software engineering opportunities, collaborations,
            or portfolio feedback.
          </p>
        </header>

        <section className="mt-8">
          <ul className="space-y-3">
            {contactLinks.map((link) => (
              <li
                key={link.label}
                className="flex flex-wrap items-center gap-3 rounded border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <span className="w-24 font-mono text-sm text-[var(--color-accent-pink)]">
                  {link.label}
                </span>
                <a
                  href={link.href}
                  className="text-[var(--color-accent)] underline-offset-4 hover:underline"
                  {...(link.label !== "Email"
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.value}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white">Related pages</h2>
          <ul className="mt-4 space-y-2 text-[var(--color-accent)]">
            <li>
              <Link href="/about">About {siteConfig.name}</Link>
            </li>
            <li>
              <Link href="/projects">View projects</Link>
            </li>
            <li>
              <Link href="/blog">Read the blog</Link>
            </li>
          </ul>
        </section>
      </article>
    </SeoPageShell>
  );
}
