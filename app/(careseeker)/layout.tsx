"use client";
import Header from "@/components/header";
import { AuthProvider } from "@/components/AuthProvider";
import { ProtectedRoute } from "@/components/ProtectedRoutes";

export default function CaregiverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedRoute requiredRole="CARESEEKER">
        <Header />
        <div className="mt-[62px] md:mt-[74px]">{children}</div>
      </ProtectedRoute>
    </AuthProvider>
  );
}
