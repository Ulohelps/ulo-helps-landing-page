import type React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "../providers";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});
export const metadata: Metadata = {
  title: "Ulohelps - Caregiver Network",
  description:
    "Join the ULO Caregiver Network and connect with families who need your care",
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
      <body className={`${plusJakarta.className} bg-[#fafafa]  font-medium`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
