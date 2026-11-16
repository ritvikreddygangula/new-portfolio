import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Martian_Mono, Mrs_Saint_Delafield } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/header";
import { Motion } from "@/components/motion";
import { site } from "@/data/site";
import "./globals.css";

// Boska is the display voice, Supreme the reading text, Martian Mono only data; the script is only the signature.
const boska = localFont({
  src: [
    { path: "./fonts/boska-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/boska-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-boska",
  display: "swap",
});
const supreme = localFont({
  src: [
    { path: "./fonts/supreme-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/supreme-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-supreme",
  display: "swap",
});
const mono = Martian_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-martian", display: "swap", preload: false });
const sign = Mrs_Saint_Delafield({ subsets: ["latin"], weight: "400", variable: "--font-sign", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.role}`, template: `%s | ${site.name}` },
  description: site.description,
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
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: `${site.name} | ${site.role}`,
    description: site.description,
    url: site.url,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}, software engineer` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role}`,
    description: site.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1c1a17" },
    { media: "(prefers-color-scheme: light)", color: "#f3efe4" },
  ],
};

// Runs before first paint. Sets the saved theme, or the system's when nothing is saved, and turns on hidden-until-revealed styles only
// when JavaScript and motion are both available. If the bundle never arrives, content shows anyway.
const flags = `(function(){var d=document.documentElement;var t=null;try{t=localStorage.getItem('theme')}catch(e){}if(t?t==='light':matchMedia('(prefers-color-scheme: light)').matches)d.classList.add('light');d.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion');setTimeout(function(){if(!d.classList.contains('ready'))d.classList.remove('motion')},3500)}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  alumniOf: { "@type": "CollegeOrUniversity", name: "Arizona State University" },
  sameAs: [site.github.href, site.linkedin.href],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${boska.variable} ${supreme.variable} ${mono.variable} ${sign.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: flags }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Analytics />
        <Motion />
      </body>
    </html>
  );
}
