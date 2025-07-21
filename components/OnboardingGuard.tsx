"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCareseekersStore } from "@/lib/stores/careseeker-store";

const OnboardingGuard = ({ children }: { children: React.ReactNode }) => {
  const { profile } = useCareseekersStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/onboarding" && profile && !profile?.primaryService) {
      router.push("/onboarding");
    }
  }, [profile, pathname, router]);

  if (pathname !== "/onboarding" && profile && !profile?.primaryService) {
    return null;
  }

  return <>{children}</>;
};

export default OnboardingGuard;
