"use client";

import HeaderWrapper from "@/components/header-wrap";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

import FilterIcon from "@/public/icons/filter.svg";
import { CaregiverCard } from "@/components/CaregiverCard";
import FilterPanel from "@/components/filter-panel";
import { CaregiverFilterBar } from "@/components/caregiver-filter-bar";
import { useCaregiverStore } from "@/lib/stores/caregiver-store";
import SkeletonCard from "./components/CaregiverSkeleton";
import EmptyState from "./components/CaregiverEmpty";

const FindCaregiver = () => {
  const [showFilters, setShowFilters] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    caregivers,
    searchCaregivers,
    loading,
    totalResults,
    setSearchParams,
  } = useCaregiverStore();

  const getActiveFilterParams = () => {
    const validKeys = [
      "experienceLevel",
      "genders",
      "ethnicities",
      "languages",
      "minSalary",
      "maxSalary",
      "availability",
      "liveInAvailable",
      "status",
    ];
    return Array.from(searchParams.entries()).filter(([key]) =>
      validKeys.includes(key)
    );
  };

  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(`/find-caregiver?${params.toString()}`);
  };

  // Fetch caregivers when search params change
  useEffect(() => {
    const fetchCaregivers = async () => {
      const query: any = {};
      const arrayKeys = ["serviceTypes", "genders", "ethnicities", "languages"];
      searchParams.forEach((value, key) => {
        if (arrayKeys.includes(key)) {
          query[key] = value.split(",").filter(Boolean); // avoid empty strings
        } else if (key === "liveInAvailable") {
          query[key] = value === "true";
        } else if (["minSalary", "maxSalary"].includes(key)) {
          query[key] = parseInt(value);
        } else {
          query[key] = value;
        }
      });

      setSearchParams(query);
      try {
        await searchCaregivers(query);
      } catch (error) {
        // handle error if needed
      }
    };

    fetchCaregivers();
  }, [searchParams]);

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
          {totalResults} profiles found
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

      {/* Active filters display */}
      {getActiveFilterParams().length > 0 && (
        <div className="max-w-[1136px] mx-auto px-4 md:px-8 mt-4 flex flex-wrap gap-2">
          {getActiveFilterParams().map(([key, value]) => (
            <div
              key={key + value}
              className="flex items-center bg-[#B4E1F3] border border-[#1DA5DB] text-[#475367] text-sm font-medium px-3 py-1 rounded-[8px] gap-1"
            >
              <span>
                {key}: {value}
              </span>
              <button
                onClick={() => removeFilter(key)}
                className="text-[#98A2B3] hover:text-[#344054]"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Caregivers list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1136px] mx-auto px-4 md:px-8 mt-8">
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))
          : caregivers && caregivers.length > 0
          ? caregivers.map((caregiver) => (
              <CaregiverCard key={caregiver.id} caregiver={caregiver} />
            ))
          : !loading && <EmptyState />}
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
