import type { Metadata } from "next";
import "@fontsource/archivo/400.css";
import "@fontsource/archivo/700.css";
import "@fontsource/archivo/800.css";
import "@fontsource/archivo/900.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";
import { company } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} — ${company.tagline}`,
    template: `%s · ${company.shortName}`
  },
  description:
    "World-class industrial safety equipment, PPE, training and workplace safety solutions for manufacturing, construction, oil & gas, mining, logistics and healthcare.",
  keywords: ["industrial safety", "PPE", "workplace safety", "fire safety equipment", "safety training", "risk assessment", "safety audits"],
  openGraph: { type: "website", siteName: company.name, title: `${company.name} — ${company.tagline}`, description: "Certified PPE, safety equipment, training and audits.", url: siteUrl },
  twitter: { card: "summary_large_image", title: company.name },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
