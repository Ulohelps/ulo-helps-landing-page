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
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

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
  const { profile } = useCareseekersStore();
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

  /* const markAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      toast({
        title: "Error",
        description: "Failed to update notification status",
        variant: "error",
      });
    }
  }; */

  /*  const markAllAsRead = async () => {
    if (!user?.id) return;

    try {
      await notificationService.markAllAsRead(user.id);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all as read:", error);
      toast({
        title: "Error",
        description: "Failed to update notifications",
        variant: "error",
      });
    }
  }; */

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
    setOpen(false);
  };

  // Initial fetch and periodic refresh
  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Refresh notifications when dropdown opens
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

        {/* Navigation */}
        <div className="flex items-center gap-4 md:gap-6">
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

          {/* Icons */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Search Icon - Mobile */}
            <button
              className="md:hidden p-2 text-[#475467]"
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
                className="max-w-[450px] rounded-2xl bg-white border border-[#EAECF0] shadow-xl mt-2 p-0 overflow-hidden"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#EAECF0] bg-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-[#101828]">
                      Notifications
                    </h3>
                    {/* {unreadCount > 0 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          markAllAsRead();
                        }}
                        className="text-sm font-medium text-[#5E8AFF] hover:text-[#4670EA]"
                        disabled={isLoading}
                      >
                        Mark all as read
                      </button>
                    )} */}
                  </div>
                </div>

                {/* Notifications List */}
                <div className="max-h-[480px] overflow-y-auto">
                  {isLoading ? (
                    <div className="p-4 text-center text-sm text-[#475467]">
                      Loading notifications...
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
                                } truncate`}
                              >
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="ml-2 flex-shrink-0 w-2 h-2 rounded-full bg-[#5E8AFF]" />
                              )}
                            </div>
                            <p className="mt-1 text-sm text-[#475367]">
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

                {/* Footer */}
                {/* <div className="px-4 py-3 border-t border-[#EAECF0] bg-white">
                  <button
                    className="w-full text-center text-sm font-medium text-[#5E8AFF] hover:text-[#4670EA]"
                    onClick={() => {
                      setNotificationOpen(false);
                      router.push("/notifications");
                    }}
                  >
                    View all notifications
                  </button>
                </div> */}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-2 focus:outline-none"
                  aria-label="User menu"
                >
                  {profile?.profileImageUrl ? (
                    <Image
                      src={profile.profileImageUrl}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover border border-[#EAECF0]"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full border border-[#D0D5DD] flex items-center justify-center bg-white">
                      <User2 className="w-5 h-5 text-[#475467]" />
                    </div>
                  )}
                  <ChevronDown className="hidden md:block w-4 h-4 text-[#98A2B3]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white rounded-xl border border-[#EAECF0] shadow-xl mt-2 p-0"
              >
                <DropdownMenuItem
                  className="px-4 py-3 cursor-pointer focus:bg-[#F9FAFB]"
                  onClick={() => router.push("/account-settings")}
                >
                  <div className="flex items-center gap-3">
                    {profile?.profileImageUrl ? (
                      <Image
                        src={profile.profileImageUrl}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full border border-[#D0D5DD] flex items-center justify-center bg-white">
                        <User2 className="w-4 h-4 text-[#475467]" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-[#101828]">
                      Account settings
                    </span>
                  </div>
                </DropdownMenuItem>
                <div className="px-4 py-3 border-y border-[#EAECF0] bg-[#F9FAFB]">
                  <p className="text-xs font-medium text-[#475467] mb-1">
                    Subscription status
                  </p>
                  <div className="px-3 py-1.5 bg-[#ECFDF3] border border-[#ABEFC6] rounded-full text-center">
                    <span className="text-xs font-medium text-[#067647]">
                      Active
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
