import { AnimatedPageBackground } from "@/components/animated-page-background";
import { Reveal } from "@/components/reveal";
// import { FAQs } from "@/features/home/components/FAQs";
import { GuaranteeCta } from "@/features/home/components/guarantee-cta";
import { HeroSection } from "@/features/home/components/hero-section";
import HowItworks from "@/features/home/components/how-it-works";
import { LatestBlogPosts } from "@/features/home/components/latest-blog-posts";
import ServiceSection from "@/features/home/components/services-section";
import TestimonialSlider from "@/features/home/components/testimonial";
import { WhyChooseSection } from "@/features/home/components/why-choose-section";

const Home = () => {
  return (
    <div className="relative min-h-screen">
      <AnimatedPageBackground />
      <div className="relative z-[1]">
        <HeroSection />
        <Reveal delay={0.04}>
          <WhyChooseSection />
        </Reveal>
        <Reveal delay={0.06}>
          <HowItworks />
        </Reveal>
        <Reveal delay={0.06}>
          <ServiceSection />
        </Reveal>
        <Reveal delay={0.06}>
          <TestimonialSlider />
        </Reveal>
        <Reveal delay={0.04}>
          <GuaranteeCta />
        </Reveal>
        <Reveal delay={0.06}>
          <LatestBlogPosts />
        </Reveal>
        {/* <Reveal delay={0.06}>
          <FAQs />
        </Reveal> */}
      </div>
    </div>
  );
};

export default Home;
