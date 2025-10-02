import React from "react";
import Image from "next/image";
import ChefPic from "@/public/about-us/about-ulo.png";

const OurStory = () => {
  return (
    <div className="max-w-[1136px] px-4 mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 py-[96px]">
      <Image
        src={ChefPic}
        alt="Chef"
        width={1000}
        height={1000}
        className="rounded-[24px] w-full lg:w-[556px] h-auto object-cover"
      />
      <div className="bg-[#D4E8DB] rounded-[24px] p-6 border border-[#17403A] w-full">
        <h2 className="text-[28px] text-[#06212C] font-semibold">About ULO</h2>
        {/*  <p className="text-base text-[#06212C] font-normal mt-6">
          ULO Helps is a community-driven online marketplace designed to connect
          families and individuals with a network of verified domestic workers,
          and service providers including maids, nannies, cooks, drivers,
          housekeepers, chefs, cleaners etc.
        </p>
        <p className="text-base text-[#06212C] font-normal mt-4">
          The platform was inspired by the challenges many Nigerians, including
          our founder, face when hiring skilled domestic help through
          unregulated agents. The platform provides a seamless and simplified
          hiring process by directly connecting employers to a network of
          thoroughly-vetted service providers, ensuring users can hire with
          confidence and peace of mind.
        </p> */}
        <p className="text-base text-[#06212C] font-normal mt-4">
          Ulo helps provides fast and easy access to verified and skilled
          caregivers for families and individuals who value convenience
        </p>
      </div>
    </div>
  );
};

export default OurStory;
