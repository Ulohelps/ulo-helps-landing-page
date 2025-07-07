import React from "react";
import Image from "next/image";
import User from "@/public/images/Image.png";
import { Users } from "lucide-react";
import GuardIcon from "@/public/icons/gaurd.svg";
import Bag from "@/components/icons/bag.svg";
import { Caregiver } from "@/types/caregiver";
import { removeUnderscores } from "@/lib/utils";

interface HeaderProps {
  headerDetails: Caregiver | null;
  isLoading?: boolean;
}

const Header = ({ headerDetails, isLoading = false }: HeaderProps) => {
  if (isLoading) {
    return <HeaderSkeleton />;
  }

  return (
    <div className="flex flex-col items-center md:flex-row gap-4 lg:w-[70%]">
      <div className="w-[266px] h-[280px] relative overflow-hidden rounded-[12px] border border-gray-300">
        {headerDetails?.profileImageUrl ? (
          <Image
            src={headerDetails.profileImageUrl}
            alt="Caregiver profile"
            width={1000}
            height={1000}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="bg-gray-200 p-6 h-full w-full flex items-center justify-center">
            <Users className="h-[200px] w-[180px] text-gray-500" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold text-[#1D2739]">
            {headerDetails?.firstName || "--"} {headerDetails?.lastName || "--"}
          </h2>
          <Image src={GuardIcon} alt="guard icon" />
        </div>
        <div className="flex items-center gap-1 flex-wrap mb-2">
          <Image src={Bag} alt="bag icon" />
          {headerDetails?.serviceTypes?.map((service, idx) => (
            <span
              key={idx}
              className="text-[#475367] text-base font-normal capitalize"
            >
              {removeUnderscores(service) || "--"}
            </span>
          ))}
        </div>
        <p className="max-w-[446px] text-[#667085] text-base leading-relaxed">
          {headerDetails?.bio || "--"}
        </p>
      </div>
    </div>
  );
};

export default Header;

const HeaderSkeleton = () => (
  <div className="flex flex-col items-center md:flex-row gap-4 lg:w-[70%] animate-pulse">
    <div className="w-[266px] h-[280px] bg-gray-200 rounded-[12px]" />
    <div className="flex flex-col gap-4 w-full">
      <div className="h-6 w-3/4 bg-gray-200 rounded-md" />
      <div className="h-4 w-1/2 bg-gray-200 rounded-md" />
      <div className="h-20 w-full bg-gray-200 rounded-md" />
    </div>
  </div>
);
