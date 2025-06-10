"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "CAREGIVER" | "CARESEEKER";
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requiredRole,
  redirectTo = "/auth/login",
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, user, isHydrated } = useAuthStore();

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    if (requiredRole && user?.role !== requiredRole) {
      router.push("/");
      return;
    }
  }, [isAuthenticated, user, router, isHydrated, requiredRole, redirectTo]);

  if (
    !isHydrated ||
    !isAuthenticated ||
    (requiredRole && user?.role !== requiredRole)
  ) {
    return null;
  }

  return <>{children}</>;
}
