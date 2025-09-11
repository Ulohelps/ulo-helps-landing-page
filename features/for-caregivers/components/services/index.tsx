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
    label: "Driver",
    value:
      "With ULO, you get direct access to families and professionals looking for trusted drivers. We verify clients, match you with real jobs, and help you move forward literally and professionally.",
    icon: <DriverICon />,
    color: "#0D5EBA",
  },
  {
    label: "Housekeeper",
    value:
      "At ULO, housekeeping isn’t just about chores, it’s about care. We connect you with families who see and respect the value you bring to their homes. Say goodbye to middlemen, and hello to honest, consistent work. ",
    icon: <HousekeeperICon />,
    color: "#8F76B8",
  },
  {
    label: "Nanny",
    value:
      "Being a nanny means shaping the early days of someone’s life. At ULO, we connect you with families who trust and appreciate your role. No middlemen, no stress just real work, from real  people who need your love and experience. If you're ready to turn your talent into meaningful, rewarding work, this is your sign to join.  ",
    icon: <NannyIcon />,
    color: "#0E92C7",
  },
  {
    label: "Cleaner",
    value:
      "Whether you clean homes, offices, or short-lets, ULO connects you with real clients who value your attention to detail. Get matched based on your availability and location and take control of your schedule. ",
    icon: <CleanerIcon />,
    color: "#009987",
  },
  /* {
    label: "Elder care",
    value:
      "At ULO, we know elder care is more than just support it's about companionship, patience, and honoring a life well lived. If you have the heart and hands to care for our elderly with dignity, then ULO is the right place for you. Get matched with families who value your kindness and pay you fairly for your time and care. ",
    icon: <ElderCareICon />,
    color: "#E74A8A",
  }, */
];

const Services = () => {
  return (
    <div className="mx-auto max-w-[1136px] py-20 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 md:gap-10 lg:gap-y-16">
      {SERVICE_LIST.map((service) => (
        <div key={service.label} className="flex flex-col h-full">
          <div
            className="w-12 h-12 flex items-center justify-center rounded-full"
            style={{ backgroundColor: `${service.color}1A` }}
          >
            {service.icon}
          </div>
          <p
            className="text-2xl font-semibold mt-6"
            style={{ color: service.color }}
          >
            {service.label}
          </p>
          <p className="text-base text-[#475367] font-normal mt-2">
            {service.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Services;
