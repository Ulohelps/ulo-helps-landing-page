// app/auth/callback/page.tsx
"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function AuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const accessToken = searchParams.get("access_token");
  const refreshToken = searchParams.get("refresh_token");

  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    if (accessToken && refreshToken) {
      setToken(accessToken, refreshToken);
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [accessToken, refreshToken, setToken, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}
