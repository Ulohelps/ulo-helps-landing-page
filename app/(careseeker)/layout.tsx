"use client";
import Header from "@/components/header";
import { AuthProvider } from "@/components/AuthProvider";
import { ProtectedRoute } from "@/components/ProtectedRoutes";
import OnboardingGuard from "@/components/OnboardingGuard";
import { useCareseekersStore } from "@/lib/stores/careseeker-store";
import OnboardingModal from "@/components/onboarding/OnboardingModal";

export default function CaregiverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { openServiceModal, setOpenServiceModal } = useCareseekersStore();
  return (
    <AuthProvider>
      <ProtectedRoute requiredRole="CARESEEKER">
        <Header />
        <OnboardingGuard>
          <div className="mt-[62px] md:mt-[65px]">{children}</div>
          <OnboardingModal
            open={openServiceModal}
            onClose={() => setOpenServiceModal(false)}
          />
        </OnboardingGuard>
      </ProtectedRoute>
    </AuthProvider>
  );
}
