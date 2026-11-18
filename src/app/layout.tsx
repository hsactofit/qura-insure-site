import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { RANKMESH_BEACON_URL } from "@/lib/rankmesh/config.server";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/data/site";

const inclusiveSans = localFont({
  src: [
    { path: "./fonts/InclusiveSans.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/InclusiveSans-Italic.woff2", weight: "300 700", style: "italic" },
  ],
  display: "swap",
  variable: "--font-inclusive-sans",
});

const zalandoSansExpanded = localFont({
  src: [
    { path: "./fonts/ZalandoSansExpanded.woff2", weight: "200 900", style: "normal" },
    { path: "./fonts/ZalandoSansExpanded-Italic.woff2", weight: "200 900", style: "italic" },
  ],
  display: "swap",
  variable: "--font-zalando-sans-expanded",
});

const DEFAULT_TITLE = "Term Life & Health Insurance Advisors in India | Qura Insure";
const DEFAULT_DESCRIPTION =
  "Qura Insure helps Indian families and businesses compare term life, health and corporate insurance, with research-led advice and claims support. Confidence, Curated.";

export const metadata: Metadata = {
  // Absolute URLs (og:image, canonicals) must never resolve to localhost in production.
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: `%s | ${SITE_NAME}` },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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
        {/* Google tag (gtag.js): loaded after the page is idle so it never competes with LCP. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-87PDS2ZV3J"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
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
