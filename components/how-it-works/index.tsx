import Image from "next/image";
import React from "react";
import CareseekerScreen from "@/public/images/careseeker.png";

const HowItworks = () => {
  return (
    <div className="py-20">
      <div className="max-w-[1136px] mx-auto">
        <h2 className="text-[32px] font-bold text-center mb-6">How it works</h2>
      </div>
      <div className="max-w-[1136px] mx-auto flex items-center justify-between gap-10">
        <div className="w-323px] space-y-6">
          <div>
            <p className="text-xs text-[#009987] font-semibold">Step 1</p>
            <p className="text-base text-[#344054] font-medium mt-2">
              Create a free account
            </p>
            <div className="w-full flex items-center mt-3">
              <div className="w-4/5 h-[4px] bg-[#F6AA3D] rounded-r-[4px]"></div>
              <div className="w-1/5 h-[4px] bg-[#FCE3BE] "></div>
            </div>
          </div>
          <div>
            <p className="text-xs text-[#009987] font-semibold">Step 2</p>
            <p className="text-base text-[#344054] font-medium mt-2">
              Create a free account
            </p>
            <div className="w-full h-[4px] bg-[#FCE3BE] mt-3"></div>
          </div>
          <div>
            <p className="text-xs text-[#009987] font-semibold">Step 3</p>
            <p className="text-base text-[#344054] font-medium mt-2">
              Create a free account
            </p>
            <div className="w-full h-[4px] bg-[#FCE3BE] mt-3"></div>
          </div>
          <div>
            <p className="text-xs text-[#009987] font-semibold">Step 4</p>
            <p className="text-base text-[#344054] font-medium mt-2">
              Create a free account
            </p>
            <div className="w-full h-[4px] bg-[#FCE3BE] mt-3"></div>
          </div>
        </div>
        <div className="w-[829px] relative">
          <div className="p-5 w-[749px] rounded-[24px] bg-gradient-to-b from-[rgba(246,170,61,0.06)] from-[44.56%] to-[#F6AA3D] to-[100%]">
            <Image src={CareseekerScreen} alt="" className="rounded" />
          </div>
          <div className="w-full bg-[#1DA5DB] h-[180px] rounded-[24px] absolute -z-10 -bottom-10 right-10"></div>
        </div>
      </div>
    </div>
  );
};

export default HowItworks;
