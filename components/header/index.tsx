"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { CARESEEKER_REGISTER_URL, DOMESTIC_WORKER_CTA_URL } from "@/lib/site";
import { cn } from "@/lib/utils";
import UloLogo from "@/public/new-logo.png";

const navLinks = [
  { href: "/about-us", label: "About us" },
  // { href: "/for-domestic-workers", label: "For domestic workers" },
  { href: "/blog", label: "Blog" },
  { href: "/contacts", label: "Contacts" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 z-[60] h-20 w-full border-b px-4 py-3 backdrop-blur-md transition-colors md:px-8",
        isHome
          ? "border-[#1B5E37]/[0.08] bg-[#d9ead3]/88 shadow-none backdrop-blur-lg"
          : "border-[#E8E6E0] bg-[#FDFCF7]/95 shadow-sm"
      )}
    >
      <div className="mx-auto flex max-w-[1136px] items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image
            src={UloLogo}
            alt="Ulo logo"
            width={83}
            height={40}
            className="w-[59px] h-[29px] md:w-[83px] md:h-[40px]"
            priority
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href === "/blog" && pathname.startsWith("/blog"));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-[8px] text-base font-medium ${
                  active
                    ? "bg-[#1B5E37]/12 text-[#1B5E37]"
                    : "text-[#475467] hover:bg-[#1B5E37]/8"
                } transition-colors`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Navigation */}
        <div className="hidden md:flex shrink-0 items-center gap-3">
          <Button
            onClick={() => router.push(CARESEEKER_REGISTER_URL)}
            className="shrink-0 rounded-xl bg-[#1B5E37] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(27,94,55,0.25)] hover:bg-[#154a2d] hover:text-white whitespace-normal"
          >
            Find a verified worker
          </Button>
          {/* <Button
            variant="outline"
            asChild
            className="shrink-0 rounded-xl border-[#1B5E37]/40 bg-white/90 px-5 py-2.5 text-center text-sm font-semibold leading-snug text-[#1B5E37] shadow-sm hover:border-[#1B5E37]/55 hover:bg-white hover:text-[#154a2d] whitespace-normal"
          >
            <Link
              href="/for-domestic-workers"
              className="inline-flex items-center justify-center text-center"
            >
              Register as a domestic worker
            </Link>
          </Button> */}
        </div>
        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className={cn(
                "md:hidden rounded-lg p-2",
                isHome
                  ? "text-[#1a2e24] hover:bg-[#1B5E37]/10"
                  : "text-[#475467] hover:bg-[#F9FAFB]"
              )}
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="top" className="h-auto max-h-[min(420px,85vh)] w-full p-0 bg-white">
            <div className="h-full flex flex-col">
              <SheetHeader className="px-4 pt-5 pb-4 border-b border-[#EAECF0]">
                <SheetTitle className="text-sm font-semibold text-[#101828]"></SheetTitle>
              </SheetHeader>
              <nav className="flex-1 overflow-y-auto">
                {navLinks.map(({ href, label }) => {
                  const active =
                    pathname === href ||
                    (href === "/blog" && pathname.startsWith("/blog"));
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-6 text-sm font-medium ${
                        active
                          ? "bg-[#F0F9FF] text-[#026AA2]"
                          : "text-[#344054]"
                      } border-b border-[#EAECF0]`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </nav>
              <div className="flex flex-col gap-2 border-t border-[#EAECF0] p-4">
                <Button
                  onClick={() => {
                    router.push(CARESEEKER_REGISTER_URL);
                    setOpen(false);
                  }}
                  className="w-full rounded-xl bg-[#1B5E37] text-white hover:bg-[#154a2d] hover:text-white"
                >
                  Find a verified worker
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="h-auto min-h-11 w-full whitespace-normal rounded-xl border-[#1B5E37]/40 py-3 text-center text-sm font-semibold leading-snug text-[#1B5E37] hover:bg-[#1B5E37]/8"
                >
                  <Link
                    href={DOMESTIC_WORKER_CTA_URL}
                    className="inline-flex justify-center px-2 text-center"
                    onClick={() => setOpen(false)}
                  >
                    Register as a domestic worker
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
