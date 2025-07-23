import type React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "../providers";
import Header from "@/components/header";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});
export const metadata: Metadata = {
  title: "Ulohelps - Careseeker Network",
  description:
    "Discover trusted caregivers and join a supportive community with the ULO Careseeker Network.",
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
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
