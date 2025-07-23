"use client";

import { Home, Users, Bookmark, Menu } from "lucide-react";
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

import UloLogo from "@/public/FINAL ULO Logo_approved_main.svg";

const navLinks = [
  { href: "/about-us", label: "About us", icon: Home },
  { href: "/for-caregivers", label: "For caregivers", icon: Users },
  { href: "/contacts", label: "Contacts", icon: Bookmark },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-sm border-b border-[#EAECF0] px-4 md:px-8 py-3">
      <div className="mx-auto flex max-w-[1136px] items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={UloLogo}
            alt="Ulo logo"
            width={83}
            height={40}
            className="w-[59px] h-[29px] md:w-[83px] md:h-[40px]"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                pathname === link.href
                  ? "bg-[#F0F9FF] text-[#026AA2]"
                  : "text-[#475467] hover:bg-[#F9FAFB]"
              } transition-colors`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-4 md:gap-6">
          <Button variant="outline">Log in</Button>
          <Button>Get Started</Button>
        </div>
        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="md:hidden p-2 text-[#475467] hover:bg-[#F9FAFB] rounded-lg"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs p-0 bg-white">
            <div className="h-full flex flex-col">
              <SheetHeader className="px-4 pt-5 pb-4 border-b border-[#EAECF0]">
                <SheetTitle className="text-sm font-semibold text-[#101828]">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="flex-1 overflow-y-auto">
                {navLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium ${
                      pathname === href
                        ? "bg-[#F0F9FF] text-[#026AA2]"
                        : "text-[#475467]"
                    } border-b border-[#EAECF0]`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-[#EAECF0] flex items-center justify-between">
                <Button variant="outline">Log in</Button>
                <Button>Get Started</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
