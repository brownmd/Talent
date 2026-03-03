import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "./components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { CONFIG } from "@/blog.config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: CONFIG.title,
    template: `%s | ${CONFIG.title}`,
  },
  description: CONFIG.description,
  metadataBase: new URL(CONFIG.baseURL),
  openGraph: {
    title: CONFIG.title,
    url: CONFIG.baseURL,
    siteName: `${CONFIG.title}'s website`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${CONFIG.baseURL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${CONFIG.title}'s website`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    shortcut: "/favicon.ico",
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    types: {
      "application/rss+xml": `${CONFIG.baseURL}/rss.xml`,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-dark text-white max-w-2xl mb-40 flex flex-col mt-4 mx-auto">
        <Navbar />
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-4 md:px-0">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
