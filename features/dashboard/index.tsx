"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CaregiverSection } from "./components/CaregiverSection";
import { Search } from "lucide-react";

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
          <div className="w-full bg-white border border-[#D0D5DD] rounded-[16px] mt-8 px-4 py-4 flex flex-col md:flex-row md:items-center md:h-[72px] gap-4 md:gap-2">
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
