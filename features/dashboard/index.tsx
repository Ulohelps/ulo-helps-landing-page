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
      <div className="bg-[#E9F6FC] w-full px-12 py-8">
        <div className=" max-w-[1136px] mx-auto pb-12 relative">
          <h1 className="text-[28px] text-[#06212C] font-semibold">
            Welcome back, Nkechi
          </h1>
          <p className="text-lg font-normal text-[#344054]">
            What do you want to do today?
          </p>
          <div className="absolute bottom-[-70%] flex items-center w-full bg-white  border h-[72px] overflow-hidden border-[#D0D5DD] rounded-[16px] gap-4 mb-6">
            <Input
              placeholder="Search by keyword"
              className="px-3 py-4 text-base text-[#667185] font-normal border-0 border-r border-[#D0D5DD]"
            />
            <Input
              placeholder="Service: All"
              className="px-2 py-4 text-base text-[#667185] font-normal border-0  border-r border-[#D0D5DD]"
            />
            <Input
              placeholder="Location: All"
              className="px-2 py-4 text-base text-[#667185] font-normal border-0"
            />
            <Button className="flex item-center rounded-l-none rounded-r-[16px] py-4 text-base text-[#1D2739] font-semibold h-full">
              <Search />
              Find caregivers
            </Button>
          </div>
        </div>
      </div>
      <div className=" max-w-[1136px] mx-auto mt-16">
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
