"use client";

import {
  Menu,
  User,
  LogOut,
  User2,
  Search,
  Bell,
  ChevronDown,
  Home,
  Users,
  Bookmark,
  Check,
  SendIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useCareseekersStore } from "@/lib/stores/careseeker-store";
import UloLogo from "@/public/FINAL ULO Logo_approved_main.svg";

const navLinks = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/connections", label: "Connections", icon: Users },
  { href: "/saved-caregivers", label: "Saved caregivers", icon: Bookmark },
  { href: "/account-settings", label: "Account settings", icon: User },
  { href: "/request-caregiver", label: "Request caregiver", icon: SendIcon },
];

export default function Header() {
  const { profile } = useCareseekersStore();
  const { logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
    setOpen(false);
  };

  return (
    <header className="fixed w-full top-0 z-50 shadow-md bg-white px-4 md:px-12 py-4">
      <div className="mx-auto flex max-w-[1136px] items-center justify-between">
        {/* Left - Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src={UloLogo}
            alt="Ulo logo"
            width={1000}
            height={1000}
            className="w-[59px] h-[29px] md:w-[83px] md:h-[40px] object-contain"
          />
        </Link>

        {/* Right - Nav + Icons */}
        <div className="flex items-center justify-between">
          {/* Desktop Navigation */}
          <nav className="hidden space-x-6 text-base text-[#475367] font-semibold md:flex">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  pathname === link.href ? "bg-[#E9F6FC]" : ""
                } transition-colors py-2 px-3 rounded-[8px] text-[#475367]`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Profile & Icons */}
          <div className="flex items-center justify-between gap-2 md:gap-4 ml-4">
            <Search className="w-5 h-5 text-[#475367] cursor-pointer" />

            <div className="relative">
              <Bell className="w-5 h-5 text-[#475367] cursor-pointer" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 p-1.5 h-3 w-3 bg-[#F1473C] flex items-center justify-center text-white text-[10px] leading-none rounded-full"
              >
                3
              </Badge>
            </div>

            {profile?.profileImageUrl ? (
              <Image
                src={profile.profileImageUrl}
                alt="user profile picture"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="flex rounded-full items-center justify-center border border-[#344054] h-8 w-8 ml-2">
                <User2 className="text-[#475367] w-6 h-6" />
              </div>
            )}

            {/* Desktop Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="hidden md:block" asChild>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 border-none rounded-[20px] px-0 bg-white shadow-lg"
              >
                <DropdownMenuItem
                  className="flex items-center gap-3 px-6 py-4 cursor-pointer"
                  onClick={() => router.push("/account-settings")}
                >
                  {profile?.profileImageUrl ? (
                    <Image
                      src={profile.profileImageUrl}
                      alt="user profile picture"
                      width={80}
                      height={80}
                      className="h-4 w-4 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-6 w-6 rounded-full border-2 border-[#344054] p-1">
                      <User className="text-[#475367] h-4 w-4" />
                    </div>
                  )}
                  <span className="text-sm font-normal text-[#344054]">
                    Account settings
                  </span>
                </DropdownMenuItem>

                <div className="px-6 py-5 bg-[#F7F9FC] border-t border-b border-[#D0D5DD]">
                  <p className="text-sm text-[#344054] font-normal">
                    Subscription status:
                  </p>
                  <div className="mt-1 border border-[#5FC381] rounded-[120px] bg-[#E7F6EC] p-3 text-base font-semibold text-[#036B26] text-center">
                    Active
                  </div>
                </div>

                <DropdownMenuItem
                  className="text-[#D42620] px-6 py-4 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className="text-sm font-normal">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5 text-[#344054]" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full bg-white rounded-b-[16px] p-0 py-6"
                >
                  <SheetHeader>
                    <SheetTitle className="text-base font-semibold">
                      Menu
                    </SheetTitle>
                  </SheetHeader>

                  {/* Nav List */}
                  <nav className="flex flex-col mt-6">
                    {navLinks.map(({ href, label, icon: Icon }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 py-4 px-6 text-sm border-b border-[#E4E7EC] font-medium ${
                          pathname === href ? "bg-[#E9F6FC] rounded-md" : ""
                        } text-[#344054]`}
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </Link>
                    ))}
                  </nav>

                  {/* Subscription Active */}
                  <div className="flex items-center gap-2 px-6 py-4  border-b border-[#E4E7EC]">
                    <div className="flex items-center justify-center bg-[#0F973D] rounded-full p-[2px]">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-[#099137]">
                      Subscription active
                    </span>
                  </div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-6 py-4 gap-3 text-[#D42620] text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Log out
                  </button>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
