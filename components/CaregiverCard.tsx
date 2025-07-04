"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Bookmark, MapPin, Wallet } from "lucide-react";

import Bag from "@/components/icons/bag.svg";
import VerifiedIcon from "@/components/icons/verified.svg";

import { caregiverService } from "@/lib/services/caregiverService";
import { removeUnderscores, formatCurrency } from "@/lib/utils";

export interface Caregiver {
  id: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string;
  serviceTypes: string[];
  bio: string;
  lgaOfResidence: string;
  expectedMonthlySalary: number;
  currentlyAvailable: string;
  isBookmarked: boolean;
}

export function CaregiverCard({ caregiver }: { caregiver: Caregiver }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(caregiver.isBookmarked);

  const handleBookmarkToggle = useCallback(async () => {
    setIsBookmarked((prev) => !prev);
    try {
      if (isBookmarked) {
        await caregiverService.unbookmarkCaregiver(caregiver.id);
        router.refresh();
      } else {
        await caregiverService.bookmarkCaregiver(caregiver.id);
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
      // Revert UI change if request fails
      setIsBookmarked((prev) => !prev);
    }
  }, [isBookmarked, caregiver.id]);

  return (
    <div className="flex-shrink-0 w-full flex flex-col lg:flex-row border border-[#D0D5DD] rounded-[24px] p-4 shadow-sm group transition">
      {/* Image Section */}
      <div
        className="relative w-full lg:w-1/2 h-[240px] md:h-auto rounded-[12px] overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={caregiver?.profileImageUrl}
          alt={`${caregiver?.firstName} ${caregiver?.lastName}`}
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
            onClick={handleBookmarkToggle}
            variant="outline"
            className={`${
              isBookmarked ? "text-[#F6AA3D]" : "text-[#344054]"
            } hover:bg-white border-[#D0D5DD] rounded-full h-12 w-12 p-[24px]`}
          >
            <Bookmark fill={isBookmarked ? "#F6AA3D" : "none"} />
          </Button>

          <Button
            onClick={() => router.push(`/find-caregiver/${caregiver?.id}`)}
            className="text-[#344054] font-medium px-6 py-2 rounded-full w-full"
          >
            View profile
          </Button>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-0 md:px-6 py-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 mt-2">
            <h3 className="text-base text-[#344054] font-semibold">
              {caregiver?.firstName} {caregiver?.lastName}
            </h3>
            <Image src={VerifiedIcon} alt="Verified" />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Image src={Bag} alt="bag icon" />
            <div className="flex items-center gap-1 flex-wrap">
              {caregiver?.serviceTypes?.map((service, idx) => (
                <span
                  key={idx}
                  className="text-sm text-[#344054] font-normal capitalize"
                >
                  {removeUnderscores(service)}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm text-[#667185] font-normal mt-3">
            {caregiver?.bio}
          </p>
        </div>

        <div className="border-t border-[#E4E7EC] mt-4 pt-4 space-y-3">
          <div className="flex items-center text-sm gap-2 text-[#475367]">
            <MapPin size={16} />
            <span>{caregiver?.lgaOfResidence}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#475367]">
            <Wallet size={16} />
            <span>{formatCurrency(caregiver?.expectedMonthlySalary)}</span>
          </div>

          {caregiver?.currentlyAvailable === "AVAILABLE" && (
            <div className="flex items-center gap-2 text-sm text-[#475367]">
              <div className="flex items-center justify-center h-5 w-5 bg-[#B5E3C4] rounded-full">
                <div className="h-2 w-2 bg-[#0F973D] rounded-full animate-pulse" />
              </div>
              <span>Available</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
