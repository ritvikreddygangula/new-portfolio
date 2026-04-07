import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ritvik Reddy",
  description:
    "Computer Science Student at Arizona State University specializing in AI, Machine Learning, and Full-Stack Development. Building intelligent apps and automation tools.",
  keywords: [
    "AI Developer",
    "Full-Stack Developer",
    "Computer Science",
    "Machine Learning",
    "React",
    "Python",
    "Arizona State University",
  ],
  authors: [{ name: "Ritvik Reddy Gangula" }],
  creator: "Ritvik Reddy Gangula",
  openGraph: {
    title: "Ritvik Reddy Gangula - AI & Full-Stack Developer",
    description:
      "Computer Science Student specializing in AI, Machine Learning, and Full-Stack Development",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ritvik Reddy Gangula - AI & Full-Stack Developer",
    description:
      "Computer Science Student specializing in AI, Machine Learning, and Full-Stack Development",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/orbitron" rel="stylesheet" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <div className="pattern-bg" aria-hidden="true"></div>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "var(--card)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
              borderRadius: "0.75rem",
              fontSize: "0.875rem",
            },
            success: {
              iconTheme: { primary: "var(--accent)", secondary: "var(--card)" },
            },
            error: {
              iconTheme: { primary: "#c0622a", secondary: "var(--card)" },
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
