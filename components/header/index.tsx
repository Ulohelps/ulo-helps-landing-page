"use client";

import {
  Bell,
  ChevronDown,
  Home,
  Users,
  Bookmark,
  User,
  LogOut,
  User2,
  Search,
  Menu,
  SendIcon,
  Check,
  CircleCheck,
  Loader,
} from "lucide-react";
import { useEffect, useState } from "react";
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
import { notificationService } from "@/lib/services/notificationService";
import { removeUnderscores } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import ServiceIcon from "../icons/ServiceIcon";
import UserIcon from "../icons/UserIcon";

interface Notification {
  id: string;
  title: string;
  body: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
  updatedAt: string;
  meta?: Record<string, any>;
}

const navLinks = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/connections", label: "Connections", icon: Users },
  { href: "/saved-caregivers", label: "Saved caregivers", icon: Bookmark },
  { href: "/account-settings", label: "Account settings", icon: User },
  { href: "/request-caregiver", label: "Request caregiver", icon: SendIcon },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return (
        <div className="bg-[#F7F9FC] border border-[#F0F2F5] p-1 rounded-full h-10 w-10">
          <CircleCheck className="text-[#22C45E] w-6 h-6" />
        </div>
      );
    case "warning":
      return "⚠️";
    case "error":
      return "❌";
    default:
      return (
        <div className="bg-[#F7F9FC] border border-[#F0F2F5] p-1 rounded-full h-10 w-10">
          <Bell className="text-[#F6AA3D] w-6 h-6" />
        </div>
      );
  }
};

export default function Header() {
  const { profile, setOpenServiceModal } = useCareseekersStore();
  const { logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await notificationService.getNotifications();
      setNotifications(response.data || []);
      //setUnreadCount(response.unreadCount || 0);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
    setOpen(false);
  };

  // Initial fetch and periodic refresh
  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 300000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (notificationOpen) {
      fetchNotifications();
    }
  }, [notificationOpen]);

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-sm border-b border-[#EAECF0] px-4 md:px-8 py-3">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
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
          {navLinks.slice(0, 3).map((link) => (
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
        <div className="flex items-center gap-4 md:gap-6">
          {/* Icons */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Search Icon - Mobile */}
            <button
              className=" p-2 text-[#475467]"
              onClick={() => router.push("/find-caregiver")}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notification Dropdown */}
            <DropdownMenu
              open={notificationOpen}
              onOpenChange={setNotificationOpen}
            >
              <DropdownMenuTrigger asChild>
                <button
                  className="relative p-2 text-[#475467] hover:bg-[#F9FAFB] rounded-lg"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-[#F04438] text-white text-[10px]">
                      {unreadCount}
                    </Badge>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[90vw] sm:w-[400px] max-w-[95vw] rounded-2xl bg-white border border-[#EAECF0] shadow-xl mt-2 p-0 overflow-hidden"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#EAECF0] bg-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-[#101828]">
                      Notifications
                    </h3>
                  </div>
                </div>

                {/* Notifications List */}
                <div className="max-h-[480px] overflow-y-auto mb-5">
                  {isLoading ? (
                    <div className="p-4 flex items-center justify-center ">
                      <Loader className="animate-spin text-[#F6AA3D]" />
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-[#475467]">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className={`px-4 py-3 cursor-pointer focus:bg-[#F9FAFB] ${
                          !notification.read ? "bg-[#F9FAFB]" : "bg-white"
                        }`}
                        onClick={() => {}}
                      >
                        <div className="flex gap-3 w-full">
                          <div className="flex-shrink-0 mt-0.5 text-lg">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4
                                className={`text-base font-semibold ${
                                  !notification.read
                                    ? "text-[#344054]"
                                    : "text-[#475467]"
                                } truncate max-w-[200px] sm:max-w-[300px]`}
                              >
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="ml-2 flex-shrink-0 w-2 h-2 rounded-full bg-[#5E8AFF]" />
                              )}
                            </div>
                            <p className="mt-1 text-sm text-[#475367] truncate max-w-[220px] sm:max-w-full">
                              {notification.body}
                            </p>
                            <p className="mt-2 text-sm text-[#667185]">
                              {formatDistanceToNow(
                                new Date(notification.createdAt),
                                {
                                  addSuffix: true,
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-2 focus:outline-none"
                  aria-label="User menu"
                >
                  <div className="flex items-center gap-2 sm:gap-3 hover:bg-gray-50 rounded-lg transition-colors p-1">
                    {/* Profile Image */}
                    {profile?.profileImageUrl ? (
                      <Image
                        src={profile.profileImageUrl}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-[#EAECF0] flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#D0D5DD] flex items-center justify-center bg-white flex-shrink-0">
                        <User2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#475467]" />
                      </div>
                    )}

                    {/* Profile Info */}
                    <div className="min-w-0 space-y-0.5">
                      <p className="text-sm sm:text-base font-medium text-[#344054] line-clamp-1">
                        {profile?.firstName} {profile?.lastName}
                      </p>
                      <p className="text-xs sm:text-sm font-normal text-[#667185] line-clamp-1">
                        Looking for a{" "}
                        {removeUnderscores(profile?.primaryService || "--")}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className="hidden md:block w-4 h-4 text-[#98A2B3]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[248px ] bg-white rounded-xl border border-[#EAECF0] shadow-xl mt-2 p-0"
              >
                <DropdownMenuItem
                  className="px-6 py-4 border-b border-[#E4E7EC] cursor-pointer focus:bg-[#F9FAFB]"
                  onClick={() => router.push("/account-settings")}
                >
                  <div className="flex items-center gap-3">
                    <UserIcon />
                    <span className="text-sm font-medium text-[#101828]">
                      Account settings
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center px-6 py-4 border-b border-[#E4E7EC] "
                  onClick={() => setOpenServiceModal(true)}
                >
                  <ServiceIcon />
                  <span className="text-sm font-medium text-[#101828]">
                    Change service selection
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center px-6 py-4 border-b border-[#E4E7EC] "
                  onClick={() => router.push("/request-caregiver")}
                >
                  <SendIcon className="text-[#475367]" />
                  <span className="text-sm font-medium text-[#101828]">
                    Request caregiver
                  </span>
                </DropdownMenuItem>
                <div className="px-4 py-3 border-y border-[#EAECF0] bg-[#F9FAFB]">
                  <p className="text-xs font-medium text-[#475467] mb-1">
                    Subscription status
                  </p>
                  <div
                    className={`px-3 py-1.5 ${
                      profile?.subscription &&
                      profile?.subscription.status === "ACTIVE"
                        ? "bg-[#E7F6EC] border border-[#ABEFC6] ada"
                        : "bg-[#F0F2F5]"
                    }   rounded-full text-center`}
                  >
                    <span
                      className={`text-xs font-medium ${
                        profile?.subscription &&
                        profile?.subscription.status === "ACTIVE"
                          ? "text-[#067647]"
                          : "text-[#CB1A14] "
                      } `}
                    >
                      {profile?.subscription &&
                      profile?.subscription.status === "ACTIVE"
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>
                </div>
                <DropdownMenuItem
                  className="px-4 py-3 cursor-pointer text-[#D92D20] focus:bg-[#F9FAFB]"
                  onClick={handleLogout}
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Log out</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
              <SheetContent
                side="right"
                className="w-full max-w-xs p-0 bg-white"
              >
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
                    <div
                      className="flex items-center gap-3 px-3 py-2"
                      onClick={() => router.push("/subscriptions")}
                    >
                      <div className="w-6 h-6 rounded-full bg-[#ECFDF3] flex items-center justify-center">
                        <Check className="w-4 h-4 text-[#12B76A]" />
                      </div>
                      <span className="text-sm font-medium text-[#067647]">
                        Subscription active
                      </span>
                    </div>
                  </nav>
                  <div className="p-4 border-t border-[#EAECF0]">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 mt-2 text-sm font-medium text-[#D92D20]"
                    >
                      <LogOut className="w-5 h-5" />
                      Log out
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
