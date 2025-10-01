import React from "react";
import { StarICon } from "@/components/icons";

const values = [
  {
    title: "Transparency",
    description:
      "This reflects our dedication to building trust through reliability, security, and verified connections.",
  },
  {
    title: "Empowerment",
    description:
      "This shows our intention to elevate domestic workers and care seekers with opportunities and support.",
  },
  {
    title: "Community",
    description:
      "We are passionate about fostering meaningful relationships and shared growth.",
  },
  {
    title: "Excellence",
    description:
      "We are committed to setting the standard for professionalism and quality in domestic services, and we take this commitment very seriously.",
  },
  {
    title: "Seamless",
    description:
      "By design, we aim to make connections effortless and stress-free.",
  },
];

const ValuesDerived = () => {
  return (
    <div className="bg-[#D4E8DB] py-24 px-4">
      <div className="max-w-[1136px] mx-auto">
        <div className="max-w-[556px] mb-16">
          <h2 className="text-[32px] text-[#344054] font-semibold mb-4">
            Our values drive and define us
          </h2>
          <p className="text-lg text-[#344054] font-normal">
            We are driven by the core belief that care is the foundation of
            thriving communities.
          </p>
        </div>

        <div className="space-y-12">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-20  border-b border-[#17403A] ${
                index === 3 && "border-none"
              }`}
            >
              <div className="flex items-center gap-5">
                <div className="flex items-center justify-center p-3 h-12 w-12 bg-[#17403A] border border-[#F0EABA] rounded-[12px]">
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
