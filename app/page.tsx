import { FAQs } from "@/components/FAQs";
import { HeroSection } from "@/components/hero-section";
import NoteSection from "@/components/note-section";
import ServiceSection from "@/components/services-section";
import VerficationSection from "@/components/verification-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <NoteSection />
      <VerficationSection />
      <ServiceSection />
      <FAQs />
    </>
  );
}
