import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { ChatWidget } from "@/components/ChatWidget";
import { BottomNav } from "@/components/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LunaLog",
  description:
    "Anonymous symptom tracking for PCOS and endometriosis with community-driven, data-based insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* include coolors palette widget scripts for reference/editing */}
        <Script
          src="https://coolors.co/palette-widget/widget.js"
          strategy="afterInteractive"
        />
        <Script id="coolors-init" strategy="afterInteractive">
          {`new CoolorsPaletteWidget("07515745475988216", ["ffffff","d79fa7","edafb8","f7e1d7","dedbd2","b0c4b1","4a5759","7f7f7f","000000"]);`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="min-h-dvh bg-[radial-gradient(1100px_circle_at_20%_0%,rgba(215,159,167,0.22),transparent_55%),radial-gradient(900px_circle_at_80%_10%,rgba(176,196,177,0.18),transparent_55%)]">
          <Navbar />
          <div className="mx-auto w-full max-w-6xl px-4 py-10 pb-28 md:pb-10">
            {children}
          </div>
          <FooterDisclaimer />
          <ChatWidget />
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
