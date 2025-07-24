import Image from "next/image";
import React from "react";
import UsersCard from "@/public/images/usercard.png";
import {
  CardICon,
  ShieldICon,
  VerifyICon,
  UserSearchICon,
  LocationBlackICon,
} from "../../../../components/icons";

const VerficationSection = () => {
  return (
    <section className="max-w-[1136px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 py-12 px-4">
      <Image
        src={UsersCard}
        alt="User verification card"
        className="w-full md:w-[556px] h-auto"
      />

      <div className="bg-[#E9F6FC80] p-6 rounded-[24px] border border-[#B4E1F3] w-full md:w-1/2">
        <h2 className="text-[32px] text-[#344054] font-semibold mb-4">
          We’re not just another platform. We’re a movement for{" "}
          <span className="text-[#1DA5DB]">dignified care</span>.
        </h2>

        <div className="space-y-4">
          {[
            {
              icon: <VerifyICon />,
              text: "No easy way to verify or trust caregivers",
            },
            {
              icon: <UserSearchICon />,
              text: "Transparent profiles with experience, languages, and skills.",
            },
            {
              icon: <CardICon />,
              text: "One price, unlimited connections.",
            },
            {
              icon: <LocationBlackICon />,
              text: "Location-based smart matching.",
            },
            {
              icon: <ShieldICon />,
              text: "Safe, agent-free hiring.",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-5">
              <div className="bg-[#B4E1F3] p-2 rounded-[12px] flex items-center justify-center">
                {item.icon}
              </div>
              <p className="text-base text-[#475367] font-normal">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerficationSection;
