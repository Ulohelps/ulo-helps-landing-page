import React from "react";
import { HeroSection } from "./components/hero-section";
import OurStory from "./components/our-story";
import ValuesDerived from "./components/values-derived";
import OurTeam from "./components/our-team";
import JoinTeam from "./components/join-team/Index";

const AboutUs = () => {
  return (
    <div>
      <HeroSection />
      <OurStory />
      <ValuesDerived />
      <OurTeam />
      {/* <JoinTeam /> */}
    </div>
  );
};

export default AboutUs;
