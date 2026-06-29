import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { homeMetadata } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  ...homeMetadata,
  applicationName: "portfolioOS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: "/icon", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#7aabb5",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${jetbrainsMono.variable} h-full`}>
      <head>
        <link rel="preconnect" href="https://webring.ca" />
      </head>
      <body className="h-full antialiased">
        {children}
        <script src="https://webring.ca/embed.js" defer />
      </body>
    </html>
  );
}
