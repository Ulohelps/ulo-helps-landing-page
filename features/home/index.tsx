import { FAQs } from "@/features/home/components/FAQs";
import { HeroSection } from "@/features/home/components/hero-section";
import HowItworks from "@/features/home/components/how-it-works";
import { LatestBlogPosts } from "@/features/home/components/latest-blog-posts";
import NoteSection from "@/features/home/components/note-section";
import ServiceSection from "@/features/home/components/services-section";
import TestimonialSlider from "@/features/home/components/testimonial";
import VerficationSection from "@/features/home/components/verification-section";

const Home = () => {
  return (
    <>
      <HeroSection />
      <NoteSection />
      <VerficationSection />
      <ServiceSection />
      <HowItworks />
      <TestimonialSlider />
      <LatestBlogPosts />
      <FAQs />
    </>
  );
};

export default Home;
