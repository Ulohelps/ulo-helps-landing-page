"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CaregiverSection } from "./components/CaregiverSection";
import { Search } from "lucide-react";
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

export default function Dashboard() {
  return (
    <div>
      {/* Header */}
      <div className="bg-[#E9F6FC] w-full px-4 md:px-8 lg:px-12 py-8">
        <div className="max-w-[1136px] mx-auto pb-16 relative">
          <h1 className="text-2xl lg:text-[28px] text-[#06212C] font-semibold">
            Welcome back, Nkechi
          </h1>
          <p className="text-base lg:text-lg font-normal text-[#344054] mt-1">
            What do you want to do today?
          </p>

          {/* Search Filter */}
          <CaregiverFilterBar />
        </div>
      </div>

      {/* Caregiver Sections */}
      <div className="max-w-[1136px] mx-auto px-4 md:px-8 mt-12 space-y-10">
        <CaregiverSection
          title="Nannies"
          caregivers={dummyCaregivers}
          showAllLink="/nannies"
        />
        <CaregiverSection
          title="Drivers"
          caregivers={dummyCaregivers}
          showAllLink="/drivers"
        />
        <CaregiverSection
          title="Housekeepers"
          caregivers={dummyCaregivers}
          showAllLink="/housekeepers"
        />
        <CaregiverSection
          title="Chefs"
          caregivers={dummyCaregivers}
          showAllLink="/chefs"
        />
      </div>
    </div>
  );
}
