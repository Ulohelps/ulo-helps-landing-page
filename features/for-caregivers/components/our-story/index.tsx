import React from "react";
import Image from "next/image";
import ChefPic from "@/public/images/Contact image.svg";

const OurStory = () => {
  return (
    <div className="max-w-[1136px] px-4 mx-auto  py-20 space-y-24">
      <div className="flex flex-col lg:flex-row items-center justify-between  gap-5 md:gap-8">
        <Image
          src={ChefPic}
          alt="Chef"
          width={1000}
          height={1000}
          className="rounded-[24px] w-full lg:w-[556px] h-auto object-cover"
        />
        <div className="p-6 w-full">
          <h2 className="text-[28px] text-[#06212C] font-semibold">
            Your skills deserve respect
          </h2>
          <p className="text-base text-[#06212C] font-normal mt-4">
            UAt ULO, we believe that honest work is honorable work. Whether you
            cook, clean, care, or drive, your time, effort, and experience
            deserve recognition. That’s why we connect you directly with real
            families who value what you do. Join a community that sees you,
            respects you, and is ready to support your growth. 
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row-reverse items-center justify-between  gap-5 md:gap-8">
        <Image
          src={ChefPic}
          alt="Chef"
          width={1000}
          height={1000}
          className="rounded-[24px] w-full lg:w-[556px] h-auto object-cover"
        />
        <div className="p-6 w-full">
          <h2 className="text-[28px] text-[#06212C] font-semibold">
            No more waiting. Work starts here!
          </h2>
          <p className="text-base text-[#06212C] font-normal mt-4">
            Tired of promises that lead nowhere? ULO is different. Once you’re
            verified, you gain real access to real jobs from people across Lagos
            who need your services now.
          </p>
          <p className="text-base text-[#06212C] font-normal mt-4">
            We don’t charge you to apply, and we don’t take a cut from your
            earnings. It’s your job, your terms, your future finally in your
            control.
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between  gap-5 md:gap-8">
        <Image
          src={ChefPic}
          alt="Chef"
          width={1000}
          height={1000}
          className="rounded-[24px] w-full lg:w-[556px] h-auto object-cover"
        />
        <div className="p-6 w-full">
          <h2 className="text-[28px] text-[#06212C] font-semibold">
            They don’t want you to know this... But you can work on your own
            terms.
          </h2>
          <p className="text-base text-[#06212C] font-normal mt-4">
            Many agencies rely on keeping you dependent charging huge fees,
            delaying payments, and deciding when you work. ULO changes the game.
            We give you direct access to care seekers, so you keep what you
            earn, choose where you work, and finally have the freedom to say yes
            to jobs that work for you.
          </p>
          <p className="text-base text-[#06212C] font-normal mt-4">
            It’s not just a better way to find work it’s a better way to live. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
