"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FilterIcon from "@/public/icons/filter.svg";
import HeroImage from "../../public/images/hero-pic.png";
import { useCareseekersStore } from "@/lib/stores/careseeker-store";
import { CaregiverFilterBar } from "@/components/caregiver-filter-bar";
import FilterPanel from "@/components/filter-panel";
import { useCaregiverStore } from "@/lib/stores/caregiver-store";
import SkeletonCard from "./components/CaregiverSkeleton";
import EmptyState from "./components/CaregiverEmpty";
import { CaregiverCard } from "@/components/CaregiverCard";
import { RefreshCcw, X } from "lucide-react";

interface FilterParams {
  experienceLevel?: string;
  genders?: string[];
  ethnicities?: string[];
  languages?: string[];
  minSalary?: number;
  maxSalary?: number;
  availability?: string;
  liveInAvailable?: boolean;
  status?: string;
  search?: string;
}

const Home = () => {
  const { profile } = useCareseekersStore();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Partial<FilterParams>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<Array<[string, string]>>(
    []
  );
  const [hasMounted, setHasMounted] = useState(false);

  const { caregivers, loading, searchCaregivers, totalResults } =
    useCaregiverStore();
  const handleRefreshList = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const newActiveFilters = Object.entries(filters)
      .filter(([key, value]) => {
        if (value === undefined || value === null) return false;
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === "string") return value !== "";
        if (typeof value === "number") return value !== 0;
        if (typeof value === "boolean") return true;
        return false;
      })
      .map(([key, value]): [string, string] => {
        // Explicit return type
        let displayValue: string;
        if (Array.isArray(value)) {
          displayValue = value.join(", ");
        } else if (typeof value === "boolean") {
          displayValue = value ? "Yes" : "No";
        } else {
          displayValue = value.toString();
        }
        return [key, displayValue];
      });

    setActiveFilters(newActiveFilters);
  }, [filters]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Fetch caregivers when filters change
  useEffect(() => {
    if (!hasMounted || !profile) return;

    const payload: any = {
      ...filters,
      page: currentPage,
      limit: 6,
    };

    if (profile?.primaryService) {
      payload.serviceTypes = [profile.primaryService];
    }

    searchCaregivers(payload);
  }, [filters, currentPage, profile, hasMounted, searchCaregivers]);

  const handleApplyFilters = (newFilters: Partial<FilterParams>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setShowFilters(false);
  };

  const removeFilter = (key: keyof FilterParams) => {
    setFilters((prev) => {
      const newFilters = { ...prev };

      // For array types, we need to set them to undefined to ensure they're removed
      if (key === "genders" || key === "ethnicities" || key === "languages") {
        newFilters[key] = undefined;
      } else {
        delete newFilters[key];
      }

      return newFilters;
    });
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      minSalary: undefined,
      maxSalary: undefined,
      experienceLevel: undefined,
      genders: undefined,
      ethnicities: undefined,
      languages: undefined,
      availability: undefined,
      liveInAvailable: undefined,
      status: undefined,
      search: undefined,
    });
    setCurrentPage(1);
  };

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
        <CaregiverFilterBar
          onSearch={(searchParams) =>
            setFilters((prev) => ({
              ...prev,
              ...searchParams,
            }))
          }
        />
      </div>

      {/* Caregiver Sections */}
      <div className="max-w-[1136px] mx-auto my-12 border border-[#E4E7EC] rounded-[24px]">
        <div className="flex items-center justify-between p-6 border-b border-[#E4E7EC]">
          <p className="text-base text-[#667185] font-normal">
            Recommended caregivers
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
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 p-6">
            {activeFilters.map(([key, value]) => (
              <div
                key={key + value}
                className="flex items-center bg-[#B4E1F3] border border-[#1DA5DB] text-[#475367] text-sm font-medium px-3 py-1 rounded-[8px] gap-1"
              >
                <span>
                  {key}: {value}
                </span>
                <button
                  onClick={() => removeFilter(key as keyof FilterParams)}
                  className="text-[#98A2B3] hover:text-[#344054]"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-[#1DA5DB] text-sm font-medium hover:underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Caregiver list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
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
        {totalResults > 6 && (
          <div className="flex items-center justify-center border-t border-[#E4E7EC] p-6">
            <Button
              className="flex items-center gap-5 text-base text-[#344054] font-semibold"
              variant="outline"
              onClick={handleRefreshList}
            >
              <RefreshCcw />
              Refresh list
            </Button>
          </div>
        )}
      </div>

      {/* Filter panel */}
      <FilterPanel
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApplyFilters={handleApplyFilters}
        initialFilters={filters}
      />
    </div>
  );
};

export default Home;
