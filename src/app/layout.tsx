import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { RANKMESH_BEACON_URL } from "@/lib/rankmesh/config.server";

const inclusiveSans = localFont({
  src: [
    { path: "./fonts/InclusiveSans.ttf", weight: "300 700", style: "normal" },
    { path: "./fonts/InclusiveSans-Italic.ttf", weight: "300 700", style: "italic" },
  ],
  display: "swap",
  variable: "--font-inclusive-sans",
});

const zalandoSansExpanded = localFont({
  src: [
    { path: "./fonts/ZalandoSansExpanded.ttf", weight: "200 900", style: "normal" },
    { path: "./fonts/ZalandoSansExpanded-Italic.ttf", weight: "200 900", style: "italic" },
  ],
  display: "swap",
  variable: "--font-zalando-sans-expanded",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Qura Insure | Confidence, Curated.",
  description: "Research-led insurance advisory. Thoughtfully curated options, clear explanations, and personalised guidance for confident decisions.",
  openGraph: {
    title: "Qura Insure | Confidence, Curated.",
    description: "Research-led insurance advisory. Thoughtfully curated options, clear explanations, and personalised guidance for confident decisions.",
    images: [{ url: "/og.png", width: 1680, height: 945, alt: "QURA INSURE — Confidence, Curated." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qura Insure | Confidence, Curated.",
    description: "Research-led insurance advisory. Thoughtfully curated options, clear explanations, and personalised guidance for confident decisions.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inclusiveSans.variable} ${zalandoSansExpanded.variable}`}>
      <body className="font-sans min-h-screen flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Script src={RANKMESH_BEACON_URL} strategy="afterInteractive" />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-87PDS2ZV3J"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-87PDS2ZV3J');
          `}
        </Script>
      </body>
    </html>
  );
}
