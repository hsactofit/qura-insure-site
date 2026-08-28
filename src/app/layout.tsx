import type { Metadata } from "next";
import { Inclusive_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const inclusiveSans = Inclusive_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inclusive-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Qura Insure | Insurance that actually makes sense",
  description: "Get the best insurance coverage with expert advice and seamless experience.",
  openGraph: {
    title: "Qura Insure | Insurance that actually makes sense",
    description: "Get the best insurance coverage with expert advice and seamless experience.",
    images: [{ url: "/og.png", width: 1680, height: 945, alt: "Qura Insure" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qura Insure | Insurance that actually makes sense",
    description: "Get the best insurance coverage with expert advice and seamless experience.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inclusiveSans.variable}>
      <body className="font-sans min-h-screen flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
