import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#faf8f5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Bunchle | Science-Led Beauty & Wellness Essentials",
    template: "%s | Bunchle",
  },
  description:
    "Gentle, effective skincare and wellness essentials backed by dermatological science. Thoughtfully selected formulations for resilient, radiant skin.",
  keywords: [
    "skincare",
    "clean beauty",
    "science-backed skincare",
    "serums",
    "moisturizer",
    "wellness",
    "Nepal beauty",
    "Kathmandu skincare",
  ],
  authors: [{ name: "Bunchle Team" }],
  creator: "Bunchle",
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://bunchle.com",
    siteName: "Bunchle Beauty",
    title: "Bunchle | Science-Led Beauty & Wellness Essentials",
    description:
      "Gentle, effective skincare and wellness essentials backed by dermatological science.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bunchle | Science-Led Beauty & Wellness Essentials",
    description:
      "Gentle, effective skincare and wellness essentials backed by dermatological science.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text selection:bg-primary-subtle selection:text-text">
        <SiteHeader />
        <div className="flex-1 flex flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
