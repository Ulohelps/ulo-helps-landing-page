"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();
  const { isHydrated } = useAuthStore();

  useEffect(() => {
    if (!isHydrated) return;
    // Immediate redirect for all users
    router.replace("/auth/login");
  }, [router, isHydrated]);

  // Show loading state while hydrating
  if (!isHydrated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // This content will never render due to the immediate redirect
  return null;
}
