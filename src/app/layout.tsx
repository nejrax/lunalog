import type { Metadata } from "next";
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-zinc-900 dark:bg-black dark:text-zinc-50`}
      >
        <div className="min-h-dvh bg-[radial-gradient(1100px_circle_at_20%_0%,rgba(244,114,182,0.18),transparent_55%),radial-gradient(900px_circle_at_80%_10%,rgba(99,102,241,0.12),transparent_55%)] dark:bg-[radial-gradient(1100px_circle_at_20%_0%,rgba(244,114,182,0.10),transparent_55%),radial-gradient(900px_circle_at_80%_10%,rgba(99,102,241,0.08),transparent_55%)]">
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
