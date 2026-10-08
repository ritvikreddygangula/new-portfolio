import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Antonio } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// Compressed gothic for display type; Geist carries body and labels
const antonio = Antonio({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ritvik Reddy Gangula",
  description:
    "Software Engineer and Computer Science student at Arizona State University, building AI-powered products and backend systems. Currently a Software Engineering Intern at GCM Grosvenor.",
  keywords: [
    "Software Engineer",
    "AI Developer",
    "Full-Stack Developer",
    "Computer Science",
    "Machine Learning",
    "React",
    "Python",
    ".NET",
    "Arizona State University",
  ],
  authors: [{ name: "Ritvik Reddy Gangula" }],
  creator: "Ritvik Reddy Gangula",
  openGraph: {
    title: "Ritvik Reddy Gangula - Software Engineer",
    description:
      "Software Engineer and Computer Science student building AI-powered products and backend systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ritvik Reddy Gangula - Software Engineer",
    description:
      "Software Engineer and Computer Science student building AI-powered products and backend systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${antonio.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
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
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
