"use client";
import HeaderWrapper from "@/components/header-wrap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import FilterIcon from "@/public/icons/filter.svg";
import { CaregiverCard } from "../../components/CaregiverCard";
import FilterPanel from "@/components/filter-panel";
import { CaregiverFilterBar } from "@/components/caregiver-filter-bar";

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
        <CaregiverFilterBar />
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
