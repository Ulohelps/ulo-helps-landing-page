"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CaregiverSection } from "./components/CaregiverSection";
import UserImage from "@/public/images/Image.png";
import { CaregiverFilterBar } from "@/components/caregiver-filter-bar";
import HeroImage from "../../public/images/hero-pic.png";
import { useCareseekersStore } from "@/lib/stores/careseeker-store";

const dummyCaregivers = [
  {
    name: "Daniel Nwankwo",
    job: "Driver",
    bio: "This is the bio preview for caregiver previews...",
    location: "Ogudu GRA, Lagos",
    priceRange: "NGN 50k - 80k",
    availability: "Available",
    avatarUrl: typeof UserImage === "string" ? UserImage : UserImage.src,
  },
  {
    name: "Daniel Nwankwo",
    job: "Driver",
    bio: "This is the bio preview for caregiver previews...",
    location: "Ogudu GRA, Lagos",
    priceRange: "NGN 50k - 80k",
    availability: "Available",
    avatarUrl: typeof UserImage === "string" ? UserImage : UserImage.src,
  },
];
export default function Dashboard() {
  const { profile } = useCareseekersStore();
 
  return (
    <div className="mt-[120px] md:mt-[150px]">
      <div
        className="flex flex-col justify-between max-w-[1136px] md:h-[358px] mx-auto px-4 md:px-8 lg:px-12 py-[72px] rounded-[24px] relative "
        style={{
          backgroundImage: `url(${
            typeof HeroImage === "string" ? HeroImage : HeroImage.src
          })`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div>
          <h1 className="text-2xl lg:text-[28px] text-white font-semibold">
            Welcome back, {profile?.firstName}
          </h1>
          <p className="text-base lg:text-lg font-normal text-[#F7F9FC] mt-2">
            What do you want to do today?
          </p>
        </div>

        {/* Search Filter */}
        <CaregiverFilterBar />
      </div>

      {/* Caregiver Sections */}
      <div className="max-w-[1136px] mx-auto mt-12 space-y-10">
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
