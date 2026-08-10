import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import UIProvider from "@/components/UIProvider";
import SiteChrome from "@/components/SiteChrome";
import { site } from "@/lib/content";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  keywords: [
    "Arun Jenson",
    "product engineer",
    "frontend engineer",
    "web performance",
    "Core Web Vitals",
    "Next.js",
    "AI agent tooling",
    "MCP",
    "Chennai",
  ],
  authors: [{ name: site.name, url: site.linkedin }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title: `${site.name} — Product Engineer`,
    description: "Web performance, platform migrations, and AI-agent tooling.",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Product Engineer`,
    description: "Web performance, platform migrations, and AI-agent tooling.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

// runs before paint: apply persisted theme (default dark) to avoid a flash
const themeScript = `(function(){var t="dark";try{t=localStorage.getItem("theme")||"dark"}catch(e){}document.documentElement.classList.toggle("dark",t==="dark")})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable} grain font-sans bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300`}
      >
        <UIProvider>
          <SiteChrome />
          {children}
        </UIProvider>
      </body>
    </html>
  );
}
