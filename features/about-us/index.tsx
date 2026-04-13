import React from "react";
import { HeroSection } from "./components/hero-section";
import OurStory from "./components/our-story";
import ValuesDerived from "./components/values-derived";
import CoreValues from "./components/value-points";
import OurMisson from "./components/our-mission";

const AboutUs = () => {
  return (
    <main className="bg-[var(--ulo-cream)]">
      <HeroSection />
      <div className="border-t border-[#E8E6E0]/90">
        <OurStory />
        <OurMisson />
        <ValuesDerived />
        <CoreValues />
        {/* <OurTeam /> */}
        {/* <JoinTeam /> */}
      </div>
    </main>
  );
};

export default AboutUs;
