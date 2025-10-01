import React from "react";
import { StarICon } from "@/components/icons";

const values = [
  {
    title: "Emotional Security:",
    description:
      " Eliminates the panic and helplessness and provides peace of mind that help is available when needed. This transforms anxiety into confidence",
  },
  {
    title: "Speed & Immediacy:",
    description:
      "Instant access to available Domestic workers. No long waiting periods. Fast matching based on your specific needs and location",
  },
  {
    title: " Quality Assurance:",
    description:
      "All Domestic workers are verified and background checked. Experience levels clearly displayed. Reviews and ratings from real families",
  },
  {
    title: "Technological Ease:",
    description:
      "  Intuitive platform that works like other apps you already love. Simple booking and communication process. Mobile-first experience for on-the-go needs",
  },
  {
    title: "Availability:",
    description:
      "Domestic workers ready when you need them (including evenings,weekends, emergencies). Multiple domestic worker options to choose from",
  },
  {
    title: "Dependability:",
    description:
      "Consistent service delivery every time. Backup solutions if plans change. Professional support when issues arise",
  },
  {
    title: "Transparency:",
    description:
      "Clear pricing with no hidden fees. Detailed domestic worker profiles and credentials. Open communication channel",
  },
];

const ValuesDerived = () => {
  return (
    <div className="bg-[#D4E8DB] py-24 px-4">
      <div className="max-w-[1136px] mx-auto">
        <div className="max-w-[556px] mb-16">
          <h2 className="text-[32px] text-[#344054] font-semibold mb-4">
            Value points
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
              className={`flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-16  border-b border-[#17403A] ${
                index === values.length - 1 && "border-none"
              }`}
            >
              <div className="flex items-center gap-5">
                <div className="flex items-center justify-center p-3 h-12 w-12 bg-primary border border-[#F0EABA] rounded-[12px]">
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
