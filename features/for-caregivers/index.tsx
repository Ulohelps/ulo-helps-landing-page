import React from "react";
import { HeroSection } from "./components/hero-section";
import OurStory from "./components/our-story";
import { FAQs } from "./components/FAQs";
import Services from "./components/services";
import JoinUs from "./components/join-us";

const ForCaregivers = () => {
  return (
    <>
      <HeroSection />
      <OurStory />
      <Services />
      <JoinUs />
      <FAQs />
    </>
  );
};

export default ForCaregivers;
