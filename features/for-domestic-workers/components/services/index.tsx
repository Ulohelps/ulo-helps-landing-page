import React from "react";
import {
  NannyIcon,
  ChefICon,
  HousekeeperICon,
} from "@/components/icons";

const SERVICE_LIST = [
  {
    label: "Chef",
    value:
      "From plated courses to busy family kitchens, ULO connects professional chefs with clients who want your expertise. Show your skills, set your terms, and get matched with people who value what you bring to the table.",
    icon: <ChefICon />,
    color: "#F1473C",
  },
  {
    label: "Cook",
    value:
      "From home cooks to professional cook, ULO connects you with families and clients looking for your kind of flavor. Earn doing what you love in kitchens where your skill is respected and rewarded.",
    icon: <ChefICon />,
    color: "#E85D4C",
  },
  {
    label: "Housekeeper",
    value:
      "At ULO, housekeeping isn’t just about chores, it’s about care. We connect you with families who see and respect the value you bring to their homes. Say goodbye to middlemen, and hello to honest, consistent work.",
    icon: <HousekeeperICon />,
    color: "#8F76B8",
  },
  {
    label: "Nanny",
    value:
      "Being a nanny means shaping the early days of someone’s life. At ULO, we connect you with families who trust and appreciate your role. No middlemen, no stress just real work, from real  people who need your love and experience. If you're ready to turn your talent into meaningful, rewarding work, this is your sign to join.",
    icon: <NannyIcon />,
    color: "#0E92C7",
  },
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
