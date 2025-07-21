import React from "react";
import { Check } from "lucide-react";
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

interface ContentPRops {
  service: string | null;
  setService: (val: string) => void;
}

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

const OnboardingContent = ({ service, setService }: ContentPRops) => {
  const handleSelect = (value: string) => {
    setService(value);
  };
  return (
    <div className="max-h-[556px] overflow-y-scroll scrollbar-hide px-5 space-y-6">
      {" "}
      {SERVICE_LIST.map((item) => (
        <div
          key={item.value}
          onClick={() => handleSelect(item.value)}
          className={`flex items-center justify-between gap-4 w-full border ${
            service === item.value
              ? "border-[#344054] shadow-[0px_0px_0px_3px_#3440544D]"
              : "border-[#E4E7EC]"
          } rounded-[24px] p-6 cursor-pointer transition-all`}
        >
          <div className="flex items-center gap-4 ">
            <div
              className="w-12 h-12 flex items-center justify-center rounded-full"
              style={{ backgroundColor: `${item.color}1A` }}
            >
              {item.icon}
            </div>
            <p className="text-sm font-semibold" style={{ color: item.color }}>
              {item.label}
            </p>
          </div>
          {service === item.value && <Check />}
        </div>
      ))}
    </div>
  );
};

export default OnboardingContent;
