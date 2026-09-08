import type { Metadata, Viewport } from "next";
import { Geist, Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const malayalam = Noto_Sans_Malayalam({
  variable: "--font-malayalam",
  subsets: ["malayalam", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#14243e",
};

export const metadata: Metadata = {
  title: "Be There, From Anywhere — Telepresence Robot for Kerala Families",
  description:
    "A small, moving telepresence robot that helps families abroad see, talk to, and stay close to their loved ones in Kerala. A call can be missed. Your presence shouldn't be.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${malayalam.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream text-navy">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-warm focus:px-4 focus:py-2 focus:rounded-full"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" data-testid="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Script
          src="https://tally.so/widgets/embed.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
