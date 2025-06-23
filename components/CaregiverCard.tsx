"use client";

import { Button } from "@/components/ui/button";
import { Bookmark, MapPin, Wallet } from "lucide-react";
import Image from "next/image";
import VerifiedIcon from "@/components/icons/verified.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const [hovered, setHovered] = useState(false);

  const router = useRouter();

  return (
    <div className="flex flex-col lg:flex-row border border-[#D0D5DD] max-w-[556px] rounded-[24px] p-4 w-full shadow-sm group transition">
      <div
        className="relative w-full lg:w-1/2 h-[240px] md:h-auto rounded-[12px] overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={caregiver.avatarUrl}
          alt={caregiver.name}
          width={1000}
          height={1000}
          className="object-cover w-full h-full rounded-[12px]"
        />
        <div
          className={`absolute bottom-6 px-4 flex items-center justify-center gap-4 transition-opacity duration-300 w-full ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button
            className="text-[#344054] hover:bg-white font-medium bg-white border-[#D0D5DD] rounded-full transition h-12 w-12 p-[24px]"
            variant="outline"
          >
            <Bookmark />
          </Button>
          <Button
            onClick={() => router.push("/find-caregiver/2403430")}
            className="text-[#344054] font-medium px-6 py-2 rounded-full transition w-full "
          >
            Connect
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="px-0 md:px-6 py-5 flex flex-col justify-between flex-1">
        <div>
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
        </div>

        <div className="border-t border-[#E4E7EC] mt-4 pt-4 space-y-3">
          <div className="flex items-center text-sm gap-2 text-[#475367] font-normal">
            <MapPin size={16} />
            <span>{caregiver.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#475367] font-normal">
            <Wallet size={16} />
            {caregiver.priceRange}
          </div>
          <div className="flex items-center gap-2 text-sm text-[#475367] font-normal">
            <div className="flex items-center justify-center h-5 w-5 bg-[#B5E3C4] rounded-full">
              <div className="h-2 w-2 bg-[#0F973D] rounded-full animate-pulse" />
            </div>
            {caregiver.availability}
          </div>
        </div>
      </div>
    </div>
  );
}
