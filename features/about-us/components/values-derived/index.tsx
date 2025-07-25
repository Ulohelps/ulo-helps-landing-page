import React from "react";
import { StarICon } from "@/components/icons";

const values = [
  {
    title: "Dignity",
    description:
      "We believe that all work especially care work deserves respect. We treat both caregivers and care seekers with the humanity and dignity they deserve.",
  },
  {
    title: "Transparency",
    description:
      "We lead with honesty. From our matching process to our pricing, we are upfront and clear, so everyone can make informed, confident decisions.",
  },
  {
    title: "Care",
    description:
      "We lead with honesty. From our matching process to our pricing, we are upfront and clear, so everyone can make informed, confident decisions.",
  },
  {
    title: "Empowerment",
    description:
      "We open doors for caregivers to access real work opportunities, enabling them to earn and grow. For care seekers, we offer the confidence and control to choose help that truly fits creating a sense of empowerment on both sides of the match.",
  },
];

const ValuesDerived = () => {
  return (
    <div className="bg-[#E9F6FC] py-24 px-4">
      <div className="max-w-[1136px] mx-auto">
        <div className="max-w-[556px] mb-16">
          <h2 className="text-[32px] text-[#344054] font-semibold mb-4">
            Our values drive and define us
          </h2>
          <p className="text-lg text-[#344054] font-normal">
            We lead with honesty. From our matching process to our pricing, we
            are upfront and clear, so everyone can make informed, confident
            decisions.
          </p>
        </div>

        <div className="space-y-12">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-20  border-b border-[#B4E1F3] ${
                index === 3 && "border-none"
              }`}
            >
              <div className="flex items-center gap-5">
                <div className="flex items-center justify-center p-3 h-12 w-12 bg-[#B4E1F3] border border-[#1DA5DB] rounded-[12px]">
                  <StarICon />
                </div>
                <p className="text-xl text-[#344054] font-bold">
                  {value.title}
                </p>
              </div>
              <p className="text-base text-[#475367] font-normal lg:w-[60%]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValuesDerived;
