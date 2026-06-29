import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/portfolio";
import { siteUrl } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} Portfolio`,
    short_name: siteConfig.name,
    description:
      "Portfolio of Basit Khan, Computer Science student at Wilfrid Laurier University.",
    start_url: "/",
    display: "standalone",
    background_color: "#141618",
    theme_color: "#7aabb5",
    lang: "en-CA",
    orientation: "any",
    categories: ["portfolio", "technology", "education"],
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
