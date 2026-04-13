import type React from "react";
import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "../providers";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CookieBanner from "@/components/cookie-banner";
import { Analytics } from "@vercel/analytics/react";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Ulohelps - landing page",
  description:
    "Discover trusted domestic workers and join a supportive community with the ULO employers' Network.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${plusJakarta.className} ${fraunces.variable} bg-[#FDFCF7] scroll-smooth font-normal antialiased`}
      >
        <Header />
        <Providers>
          {children}
          <Analytics />
        </Providers>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
