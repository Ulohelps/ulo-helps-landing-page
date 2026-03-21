"use client";
import React from "react";
import {
  NannyIcon,
  ChefICon,
  HousekeeperICon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SERVICE_LIST = [
  { label: "Chef", value: "CHEF", icon: <ChefICon />, color: "#F1473C" },
  { label: "Cook", value: "COOK", icon: <ChefICon />, color: "#E85D4C" },
  {
    label: "Housekeeper",
    value: "HOUSEKEEPER",
    icon: <HousekeeperICon />,
    color: "#8F76B8",
  },
  {
    label: "Nanny",
    value: "CHILDCARE_NANNY",
    icon: <NannyIcon />,
    color: "#0E92C7",
  },
];

const ServiceSection = () => {
  const router = useRouter();

  return (
    <section
      className="py-20"
      style={{
        backgroundImage: `url("bg-gradient.png")`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-[1136px] mx-auto">
        <div className="w-full max-w-[640px] mx-auto text-center mb-12">
          <h2 className="text-[32px] text-[#344054] font-semibold mb-3">
            Because the right help changes everything
          </h2>
          <p className="text-base text-[#475367]">
            Getting the help you need shouldn't be hard. With ULO, it isn't. We
            bring you verified domestic workers, fast matching, and support every step
            of the way.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 py-4">
          {SERVICE_LIST.map((service) => (
            <div
              key={service.value}
              className="flex flex-col bg-white items-center justify-center gap-4 p-6 border border-[#E4E7EC] rounded-[24px] w-[160px] h-[120px] flex-shrink-0 hover:shadow-md transition-shadow duration-300"
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-full"
                style={{ backgroundColor: `${service.color}1A` }}
              >
                {service.icon}
              </div>
              <p
                className="text-sm font-semibold whitespace-nowrap"
                style={{ color: service.color }}
              >
                {service.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mt-16">
          <Button
            onClick={() =>
              router.push("https://careseekers.ulohelps.com/auth/register")
            }
          >
            Hire your domestic worker
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
