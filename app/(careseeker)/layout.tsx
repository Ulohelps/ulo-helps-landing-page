import Header from "@/components/header";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>
    <Header/>
    {children}
  </div>;
}
