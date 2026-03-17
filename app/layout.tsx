import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import { CONFIG } from "@/blog.config";
import { ThemeProvider } from "./components/ThemeProvider";

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
    description: CONFIG.description,
    url: CONFIG.baseURL,
    siteName: CONFIG.title,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${CONFIG.baseURL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: CONFIG.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: CONFIG.title,
    description: CONFIG.description,
    images: [`${CONFIG.baseURL}/opengraph-image`],
  },
  alternates: {
    canonical: CONFIG.baseURL,
    types: {
      "application/rss+xml": `${CONFIG.baseURL}/rss.xml`,
    },
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Inline script runs synchronously before paint to prevent FOUC.
            Dark is always the default; only switch to light if the user
            has explicitly saved "light" in localStorage. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.add('light');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="max-w-2xl mb-40 flex flex-col mt-4 mx-auto">
        <ThemeProvider>
          <Navbar />
          <main className="flex-auto min-w-0 mt-6 flex flex-col px-4 md:px-0">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""} />
      </body>
    </html>
  );
}
