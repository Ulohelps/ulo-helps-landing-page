import { FAQs } from "@/components/FAQs";
import { HeroSection } from "@/components/hero-section";
import HowItworks from "@/components/how-it-works";
import NoteSection from "@/components/note-section";
import ServiceSection from "@/components/services-section";
import VerficationSection from "@/components/verification-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <NoteSection />
      <VerficationSection />
      <HowItworks />
      <ServiceSection />
      <FAQs />
    </>
  );
}
