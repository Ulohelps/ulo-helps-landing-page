import Image from "next/image";
import React from "react";
import UsersCard from "@/public/images/usercard.png";
import { CircleCheck } from "lucide-react";

const VerficationSection = () => {
  return (
    <div className="max-w-[1136px] mx-auto flex items-center justify-between gap-8 py-12">
      <Image src={UsersCard} alt="" className=" w-[556px] h-[556px]" />
      <div className="bg-[#E9F6FC80] p-6 rounded-[24px] border border-[#B4E1F3] w-1/2">
        <h2 className="text-[32px] text-[#344054] italic font-semibold">
          We’re not just another platform. We’re a movement for{" "}
          <span className="text-[#1DA5DB]"> dignified care</span>.
          <div className="space-y-4">
            <div className="flex item-center gap-5 mt-3">
              <div className="bg-[#B4E1F3] p-2 flex items-center justify-center rounded-[12px]">
                <CircleCheck />
              </div>
              <p className="text-base text-[#475367] font-normal">
                No easy way to verify or trust caregivers
              </p>
            </div>
          </div>
        </h2>
      </div>
    </div>
  );
};

export default VerficationSection;
