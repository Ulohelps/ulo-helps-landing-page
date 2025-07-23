import React from "react";
import Image from "next/image";
import ChefPic from "@/public/images/sign-up/emediong-umoh-fY9ZV9-475o-unsplash 1.png";

const OurStory = () => {
  return (
    <div className="max-w-[1136px] mx-auto flex items-center justify-between gap-8 py-[96px]">
      <Image
        src={ChefPic}
        alt=""
        width={1000}
        height={1000}
        className="rounded-[24px] w-[556px]"
      />
      <div className="bg-[#E9F6FC] rounded-[24px] p-6 border border-[#B4E1F3]">
        <h2 className="text-[28px] text-[#06212C] font-semibold">
          The ULO Story
        </h2>
        <p className="text-base text-[#06212C] font normal mt-6">
          ULO Helps is a community-driven platform designed to connect families
          and individuals with a network of verified caregivers, and service
          providers including maids, nannies, cooks, drivers, housekeepers,
          chefs, cleaners etc.{" "}
        </p>
        <p className="text-base text-[#06212C] font normal mt-4">
          The platform addresses a critical gap in the Nigerian service market
          by providing a trusted and reliable solution for sourcing domestic
          staff and household employees.
        </p>
        <p className="text-base text-[#06212C] font normal mt-4">
          ULO Helps was inspired by the challenges many Nigerians face when
          securing skilled domestic help through unregulated agents. The
          platform ensures transparency, verification, and a seamless user
          experience for care seekers and caregivers alike.
        </p>
      </div>
    </div>
  );
};

export default OurStory;
