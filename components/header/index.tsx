"use client";
import {
  Menu,
  User,
  LogOut,
  User2,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UloLogo from "@/public/FINAL ULO Logo_approved_main.svg";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useCareseekersStore } from "@/lib/stores/careseeker-store";

const navLinks = [
  { href: "/dashboard", label: "Home" },
  { href: "/connections", label: "Connections" },
  { href: "/saved-caregivers", label: "Saved caregivers" },
];

export default function Header() {
  const { profile } = useCareseekersStore();
  const { logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };
  return (
    <header className="fixed w-full top-0 z-50 shadow-md  bg-white px-4 md:px-12 py-4">
      <div className="mx-auto flex max-w-[1136px] items-center justify-between">
        {/* Left side - Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={UloLogo} alt="Ulo logo" width={83} height={40} />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden space-x-6 text-base text-[#475367] font-semibold md:flex">
          {navLinks.map((link) => (
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

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[200px] bg-white">
              <SheetHeader>
                <SheetTitle className="text-base font-semibold">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-6 text-sm font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${
                      pathname === link.href ? "bg-[#E9F6FC]" : ""
                    } px-3 text-[#475367] py-2 rounded-md transition-colors`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Profile Dropdown */}
        <div className="hidden md:flex items-center gap-4">
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
              src={profile?.profileImageUrl}
              alt="user profile picture"
              width={80}
              height={80}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="rounded-full flex items-center justify-center border border-[#344054] h-8 w-8 ml-2">
              <User2 className=" text-[#475367] w-6 h-6" />
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 border-none rounded-[20px] px-0 bg-white shadow-lg"
            >
              <DropdownMenuItem
                className="flex items-center px-6 py-4 cursor-pointer"
                onClick={() => router.push("/account-settings")}
              >
                {profile?.profileImageUrl ? (
                  <Image
                    src={profile?.profileImageUrl}
                    alt="user profile picture"
                    width={80}
                    height={80}
                    className="h-4 w-4 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-6 w-6 rounded-full border-2 border-[#344054] p-1">
                    <User className=" text-[#475367] h-4 w-4" />
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
                className="text-[#D42620] px-6 py-4"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span className="text-[400] text-sm font-normal">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
