import React from "react";
import Image from "next/image";
import User from "@/public/images/Image.png";
import GuardIcon from "@/public/icons/gaurd.svg";

const Header = () => {
  return (
    <div className="flex flex-col items-center md:flex-row gap-4 lg:w-[70%]">
      <div className="w-[266px] min-h-[288px] relative overflow-hidden border border-gray-300">
        <Image
          src={User}
          alt="Caregiver name"
          width={120}
          height={120}
          className="object-cover w-full h-full "
        />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold text-[#1D2739]">
            Oluwatosin Johnson
          </h2>
          <Image src={GuardIcon} alt="guard icon" />
        </div>
        <p className="text-[#475367] text-base mb-2">Housekeeper</p>
        <p className="max-w-[446px] text-[#667085] text-base leading-relaxed">
          I’ve worked as a housekeeper for over 7 years, supporting busy
          families and elderly clients with cleaning, cooking, and errands. I’m
          known for being dependable, friendly, and quick to notice what needs
          to be done without being asked...
        </p>
      </div>
    </div>
  );
};

export default Header;
