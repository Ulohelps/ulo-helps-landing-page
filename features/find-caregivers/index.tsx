"use client";
import HeaderWrapper from "@/components/header-wrap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import FilterIcon from "@/public/icons/filter.svg";
import { CaregiverCard } from "../dashboard/components/CaregiverCard";
import FilterPanel from "@/components/filter-panel";

const dummyCaregivers = [
  {
    name: "Daniel Nwankwo",
    job: "Driver",
    bio: "This is the bio preview for caregiver previews...",
    location: "Ogudu GRA, Lagos",
    priceRange: "NGN 50k - 80k",
    availability: "Available",
    avatarUrl: "/images/image.png",
  },
  {
    name: "Daniel Nwankwo",
    job: "Driver",
    bio: "This is the bio preview for caregiver previews...",
    location: "Ogudu GRA, Lagos",
    priceRange: "NGN 50k - 80k",
    availability: "Available",
    avatarUrl: "/images/image.png",
  },
];

const FindCaregiver = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="relative">
      <HeaderWrapper>
        <h1 className="text-2xl lg:text-[28px] text-[#06212C] font-semibold text-center">
          Find a caregiver
        </h1>
        <div className="w-full max-w-[1136px] mx-auto px-4 md:px-8 bg-white border border-[#D0D5DD] rounded-[16px] mt-8 py-4 flex flex-col md:flex-row md:items-center md:h-[72px] gap-4 md:gap-2">
          <Input
            placeholder="Search by keyword"
            className="px-3 py-3 text-base text-[#667185] font-normal border md:border-0 border-[#D0D5DD] rounded-md md:rounded-none md:border-r"
          />
          <Input
            placeholder="Service: All"
            className="px-3 py-3 text-base text-[#667185] font-normal border md:border-0 border-[#D0D5DD] rounded-md md:rounded-none md:border-r"
          />
          <Input
            placeholder="Location: All"
            className="px-3 py-3 text-base text-[#667185] font-normal border md:border-0 border-[#D0D5DD] rounded-md md:rounded-none"
          />
          <Button className="flex items-center justify-center gap-2 w-full md:w-auto py-3 h-full text-base text-[#1D2739] font-semibold rounded-[12px] md:rounded-l-none md:rounded-r-[16px]">
            <Search size={18} />
            Find caregivers
          </Button>
        </div>
      </HeaderWrapper>

      {/* Filter row */}
      <div className="max-w-[1136px] flex items-center justify-between mx-auto px-4 md:px-8 mt-8">
        <p className="text-base text-[#667185] font-normal">
          281 profiles found
        </p>
        <Button
          variant="outline"
          className="flex items-center gap-2 text-base text-[#344054] font-semibold"
          onClick={() => setShowFilters(true)}
        >
          <Image src={FilterIcon} alt="Filter icon" className="mr-2" />
          Filter
        </Button>
      </div>

      {/* Caregivers list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1136px] mx-auto px-4 md:px-8 mt-8">
        {dummyCaregivers.map((caregiver, idx) => (
          <CaregiverCard caregiver={caregiver} key={idx} />
        ))}
      </div>

      {/* Slide-in filter panel */}
      <FilterPanel
        visible={showFilters}
        onClose={() => setShowFilters(false)}
      />
    </div>
  );
};

export default FindCaregiver;
