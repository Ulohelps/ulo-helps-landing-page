import Image from "next/image";
import React from "react";
import HelpPic from "@/public/images/help.jpg";
import { TriangleAlert } from "lucide-react";

const NoteSection = () => {
  return (
    <div className="max-w-[1136px] mx-auto flex items-center justify-between gap-8 py-12">
      <div className="bg-[#F1473C08] rounded-[24px] p-6 border border-[#F1473C33] h-[360px] w-1/2">
        <h2 className="text-[32px] text-[#344054] italic font-semibold">
          Hiring help shouldn’t be <span className="text-[#F1473C]">this</span>{" "}
          hard or risky
        </h2>
        <div className="flex items-center gap-5 mt-6">
          <div className="bg-[#F1473C26] p-2 flex items-center justify-center rounded-[12px]">
            <TriangleAlert className="text-[#F1473C]" />
          </div>
          <p className="text-base text-[#475367] font-normal">
            Endless searching, unclear credentials
          </p>
        </div>
        <div className="flex item-center gap-5 mt-3">
          <div className="bg-[#F1473C26] p-2 flex items-center justify-center rounded-[12px]">
            <TriangleAlert className="text-[#F1473C]" />
          </div>
          <p className="text-base text-[#475367] font-normal">
            Hidden agent fees and gatekeeping
          </p>
        </div>
        <div className="flex item-center gap-5 mt-3">
          <div className="bg-[#F1473C26] p-2 flex items-center justify-center rounded-[12px]">
            <TriangleAlert className="text-[#F1473C]" />
          </div>
          <p className="text-base text-[#475367] font-normal">
            No easy way to verify or trust caregivers
          </p>
        </div>
        <div className="flex item-center gap-5 mt-3">
          <div className="bg-[#F1473C26] p-2 flex items-center justify-center rounded-[12px]">
            <TriangleAlert className="text-[#F1473C]" />
          </div>
          <p className="text-base text-[#475367] font-normal">
            Caregivers facing unfair treatment
          </p>
        </div>
      </div>
      <Image
        src={HelpPic}
        alt=""
        className="rounded-full w-[556px] h-[556px]"
      />
    </div>
  );
};

export default NoteSection;
