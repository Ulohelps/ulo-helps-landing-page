import Image from "next/image";
import React from "react";
import CareseekerScreen from "@/public/images/careseeker.png";

const HowItWorks = () => {
  return (
    <div className="py-20">
      <div className="max-w-[1136px] mx-auto">
        <h2 className="text-[32px] font-bold text-center mb-6">How it works</h2>
      </div>
      <div className="max-w-[1136px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 relative">
        {/* Steps */}
        <div className="w-full lg:w-[323px] space-y-6 px-4">
          {["Step 1", "Step 2", "Step 3", "Step 4"].map((step, index) => (
            <div key={step}>
              <p className="text-xs text-[#009987] font-semibold">{step}</p>
              <p className="text-base text-[#344054] font-medium mt-2">
                Create a free account
              </p>
              <div className="w-full flex items-center mt-3">
                <div
                  className={`h-[4px] ${
                    index === 0
                      ? "w-4/5 bg-[#F6AA3D] rounded-r-[4px]"
                      : "w-full bg-[#FCE3BE]"
                  }`}
                ></div>
                {index === 0 && (
                  <div className="w-1/5 h-[4px] bg-[#FCE3BE]"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Image and Background */}
        <div className="w-full lg:w-[829px] relative px-4">
          <div className="p-5 w-full max-w-[749px] mx-auto rounded-[24px] bg-gradient-to-b from-[rgba(246,170,61,0.06)] to-[#F6AA3D]">
            <Image
              src={CareseekerScreen}
              alt="Careseeker screenshot"
              className="rounded"
            />
          </div>
          {/* Restored blue background */}
          <div className="hidden lg:block w-full h-[180px] bg-[#1DA5DB] rounded-[24px] absolute -z-10 -bottom-10 right-0"></div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
