"use client";
import Image from "next/image";

import BgCard1 from "@/public/Comp 2_2.gif";

import {
  CardICon,
  ShieldICon,
  VerifyICon,
  UserSearchICon,
  LocationBlackICon,
} from "../../../../components/icons";

const VerficationSection = () => {
  return (
    <section className="max-w-[1136px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 py-20 px-4">
      <div className="relative w-full md:w-[556px] h-[500px] overflow-hidden">
        <Image
          src={BgCard1}
          alt="User verification card"
          fill
          style={{ objectFit: "contain" }}
          quality={100}
          priority
          className="select-none"
        />
      </div>

      {/* Text Content */}
      <div className="bg-[#D4E8DB80] p-6 rounded-[24px] border border-[#17403A] w-full md:w-1/2 shadow-sm">
        <h2 className="text-[32px] text-[#344054] font-semibold mb-4 leading-snug">
          We're not just another platform. We're a movement for{" "}
          <span className="text-primary">dignified care</span>.
        </h2>

        <div className="space-y-4 mt-6">
          {[
            {
              icon: <VerifyICon />,
              text: "Verified caregivers with ID documents and background checks.",
            },
            {
              icon: <UserSearchICon />,
              text: "Transparent profiles.",
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
              text: "Safe hiring.",
            },
          ].map((item, index) => (
            <div className="flex items-center gap-5" key={index}>
              <div className="bg-[#17403A] p-2 rounded-[12px] flex items-center justify-center transition-transform">
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
