import React from "react";
import {
  NannyIcon,
  PetCareICon,
  DriverICon,
  ChefICon,
  ElderCareICon,
  HousekeeperICon,
  LaundryICon,
  CleanerIcon,
} from "@/components/icons";

const SERVICE_LIST = [
  {
    label: "Nanny",
    value: "CHILDCARE_NANNY",
    icon: <NannyIcon />,
    color: "#0E92C7",
  },
  {
    label: "Cleaner",
    value: "CLEANER",
    icon: <CleanerIcon />,
    color: "#009987",
  },
  {
    label: "Housekeeper",
    value: "HOUSEKEEPER",
    icon: <HousekeeperICon />,
    color: "#8F76B8",
  },
  { label: "Chef", value: "CHEF", icon: <ChefICon />, color: "#F1473C" },
  { label: "Driver", value: "DRIVER", icon: <DriverICon />, color: "#0D5EBA" },
  {
    label: "Pet care",
    value: "PET_CARE",
    icon: <PetCareICon />,
    color: "#C28400",
  },
  {
    label: "Elder care",
    value: "ELDER_CARE",
    icon: <ElderCareICon />,
    color: "#E74A8A",
  },
  {
    label: "Laundry man",
    value: "LAUNDRY_WASHER",
    icon: <LaundryICon />,
    color: "#AB5BA6",
  },
];

const ServiceSection = () => {
  return (
    <div className="max-w-[1136px] mx-auto py-12">
      <div className="w-[60%] mx-auto">
        <h2 className="text-[32px] text-[#344054] text-center font-semibold">
          Because the right help changes everything
        </h2>
        <p className="text-base text-[#475367] text-center font-normal">
          Getting the help you need shouldn’t be hard. With ULO, it isn’t. We
          bring you verified caregivers, fast matching, and support every step
          of the way.
        </p>
      </div>
      <div className="flex items-center justify-between gap-5 overflow-hidden mt-10">
        {SERVICE_LIST.map((service) => (
          <div
            key={service.label}
            className="flex flex-col items-center justify-center gap-4 p-6 border border-[#E4E7EC] rounded-[24px] w-[160px]"
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
    </div>
  );
};

export default ServiceSection;
