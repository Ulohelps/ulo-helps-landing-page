"use client";

import { Button } from "@/components/ui/button";
import { MapPin, CircleCheck, Wallet } from "lucide-react";
import Image from "next/image";
import VerifiedIcon from "@/components/icons/verified.svg";

export interface Caregiver {
  name: string;
  job: string;
  bio: string;
  location: string;
  priceRange: string;
  availability: string;
  avatarUrl: string;
}

export function CaregiverCard({ caregiver }: { caregiver: Caregiver }) {
  return (
    <div className=" flex items-center border border-[#D0D5DD] rounded-[24px] p-4 w-full space-y-2 shadow-sm">
      <Image
        src={caregiver.avatarUrl}
        alt={caregiver.name}
        width={1000}
        height={1000}
        className="w-[272px]  object-cover rounded-[12px]"
      />
      <div className="px-6 py-5">
        <div className="flex items-center gap-2 mt-2">
          <h3 className="text-base text-[#344054] font-semibold">
            {caregiver.name}
          </h3>
          <Image src={VerifiedIcon} alt="" />
        </div>
        <p className="text-sm text-[#344054] font-normal mt-2">
          {caregiver.job}
        </p>
        <p className="text-sm text-[#667185] font-normal mt-3">
          {caregiver.bio}
        </p>
        <div className="border-t border-[#E4E7EC] mt-3 space-y-3 pt-4">
          <div className="flex items-center text-sm gap-2 text-[#475367] font-normal">
            <MapPin size={16} />
            <span>{caregiver.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#475367] font-normal">
            <Wallet size={16} />
            {caregiver.priceRange}
          </div>
          <div className="flex items-center gap-2  text-sm text-[#475367] font-normal">
            <div className="flex items-center justify-center h-5 w-5 p-[6px] bg-[#B5E3C4] rounded-full">
              <div className="h-2 w-2 bg-[#0F973D] rounded-full animate-pulse" />
            </div>

            {caregiver.availability}
          </div>
        </div>

        <Button className="mt-2 w-full hidden">Connect</Button>
      </div>
    </div>
  );
}
