import Image from "next/image";
import React from "react";
import HelpPic from "@/public/images/baptista-ime-james-dNUviD82WnY-unsplash 2.svg";
import { TriangleAlert } from "lucide-react";

const NoteSection = () => {
  return (
    <div className="max-w-[1136px] mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-20 px-4">
      {/* Text Card */}
      <div className="bg-[#F1473C08] rounded-[24px] p-6 border border-[#F1473C33] w-full md:w-1/2 h-fit">
        <h2 className="text-[28px] md:text-[32px] text-[#344054] font-semibold">
          Hiring help shouldn’t be <span className="text-[#F1473C]">this</span>{" "}
          hard or risky
        </h2>

        {/* List Items */}
        {[
          "Endless searching, unclear credentials",
          "Hidden agent fees and gatekeeping",
          "No easy way to verifyt caregivers",
        ].map((text, index) => (
          <div key={index} className="flex items-center gap-5 mt-4">
            <div className="bg-[#F1473C26] p-2 flex items-center justify-center rounded-[12px]">
              <TriangleAlert className="text-[#F1473C] w-5 h-5" />
            </div>
            <p className="text-base text-[#475367] font-normal">{text}</p>
          </div>
        ))}
      </div>

      {/* Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src={HelpPic}
          alt="A caregiver assisting a person"
          quality={1000}
          className="rounded-full w-[320px] h-[320px] md:w-[556px] md:h-[556px] object-cover"
        />
      </div>
    </div>
  );
};

export default NoteSection;
