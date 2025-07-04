"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CaregiverSection } from "./components/CaregiverSection";
import UserImage from "@/public/images/Image.png";
import { CaregiverFilterBar } from "@/components/caregiver-filter-bar";
import HeroImage from "../../public/images/hero-pic.png";
import { useCareseekersStore } from "@/lib/stores/careseeker-store";
import { useCaregiverStore } from "@/lib/stores/caregiver-store";
import { useEffect } from "react";

export default function Dashboard() {
  const { profile } = useCareseekersStore();
  const {
    drivers,
    nannies,
    chefs,
    housekeepers,
    getChefs,
    getDrivers,
    getNannies,
    getHousekeepers,
  } = useCaregiverStore();

  // Fetch caregivers on mount
  useEffect(() => {
    getDrivers();
    getNannies();
    getHousekeepers();
    getChefs();
  }, []);

  return (
    <div className="mt-[120px] md:mt-[150px] px-3">
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
          caregivers={nannies}
          showAllLink="CHILDCARE_NANNY"
          isLoading={nannies ? false : true}
        />
        <CaregiverSection
          title="Drivers"
          caregivers={drivers}
          showAllLink="DRIVER"
          isLoading={drivers ? false : true}
        />
        <CaregiverSection
          title="Housekeepers"
          caregivers={housekeepers}
          showAllLink="HOUSEKEEPER"
          isLoading={housekeepers ? false : true}
        />
        <CaregiverSection
          title="Chefs"
          caregivers={chefs}
          showAllLink="CHEF"
          isLoading={chefs ? false : true}
        />
      </div>
    </div>
  );
}
