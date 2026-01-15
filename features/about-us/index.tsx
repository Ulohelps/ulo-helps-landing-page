import React from "react";
import { HeroSection } from "./components/hero-section";
import OurStory from "./components/our-story";
import ValuesDerived from "./components/values-derived";
import OurTeam from "./components/our-team";
import JoinTeam from "./components/join-team/Index";
import CoreValues from "./components/value-points";
import OurMisson from "./components/our-mission";

const AboutUs = () => {
  return (
    <div>
      <HeroSection />
      <OurStory />
      <OurMisson />
      <ValuesDerived />
      <CoreValues />
      {/* <OurTeam /> */}
      {/* <JoinTeam /> */}
    </div>
  );
};

export default AboutUs;
