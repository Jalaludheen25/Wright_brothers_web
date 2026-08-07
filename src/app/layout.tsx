import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Cursor } from "@/components/layout/Cursor";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { JsonLd } from "@/components/ui/JsonLd";
import { SITE } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display-loaded",
  display: "swap",
  preload: true,
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-loaded",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Luxury Residential Design & Build, Dubai`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.legalName,
  keywords: [
    "villa renovation Dubai",
    "design and build Dubai",
    "luxury home builders Dubai",
    "custom villa construction UAE",
    "interior fit out Dubai",
    "Emirates Hills villa builder",
    "Palm Jumeirah renovation",
  ],
  category: "Architecture & Construction",
  formatDetection: { telephone: true, address: true, email: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: `${SITE.name} — Luxury Residential Design & Build, Dubai`,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2eee7" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0f10" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AE" className={`${display.variable} ${sans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="antialiased">
        <JsonLd schema={[organizationSchema(), websiteSchema()]} />

        <MotionProvider>
          <SmoothScroll />
          <ScrollProgress />
          <Cursor />
          <Header />

          <main id="main" tabIndex={-1}>
            {children}
          </main>

          <Footer />
          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
