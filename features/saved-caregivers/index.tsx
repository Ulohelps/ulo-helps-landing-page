"use client";
import HeaderWrapper from "@/components/header-wrap";
import React, { use, useEffect, useState } from "react";
import EmptySaveCaregivers from "./components/EmptyConnections";
import { useCaregiverStore } from "@/lib/stores/caregiver-store";
import SkeletonCard from "@/features/find-caregivers/components/CaregiverSkeleton";
import { Caregiver } from "@/types/caregiver";
import { CaregiverCard } from "@/components/CaregiverCard";

interface BookmarksProps {
  bookmarkId: string;
  caregiver: Caregiver;
  createdAt: string;
}

const SavedCaregivers = () => {
  const [bookmarkedCaregivers, setBookmarkedCaregivers] =
    useState<BookmarksProps | null>(null);

  const { getBookmarkedCaregivers } = useCaregiverStore();

  // Fetch bookmarked caregivers
  const fetchBookmarkedCaregivers = async () => {
    try {
      const response = await getBookmarkedCaregivers();
      setBookmarkedCaregivers(response.data);
    } catch (error) {
      console.error("Error fetching bookmarked caregivers:", error);
    }
  };

  useEffect(() => {
    fetchBookmarkedCaregivers();
  }, []);

  return (
    <div>
      <HeaderWrapper>
        <div className="max-w-[1136px] mx-auto py-12">
          <h1 className="text-2xl lg:text-[28px] text-[#06212C] font-semibold">
            Saved caregiver
          </h1>
        </div>
      </HeaderWrapper>
      <div className="max-w-[1136px] mx-auto px-4 md:px-8 lg:px-12 mt-12 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1136px] mx-auto px-2 my-8">
          {bookmarkedCaregivers === null
            ? Array.from({ length: 4 }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))
            : Array.isArray(bookmarkedCaregivers) &&
              bookmarkedCaregivers.length > 0 &&
              bookmarkedCaregivers.map((caregiver) => (
                <CaregiverCard
                  key={caregiver.caregiver.id}
                  caregiver={caregiver.caregiver}
                />
              ))}
        </div>
        {Array.isArray(bookmarkedCaregivers) &&
          bookmarkedCaregivers.length <= 0 && (
            <EmptySaveCaregivers
              title={"You haven’t saved any caregiver profiles"}
              description={
                "Use the bookmark icon on caregiver profile cards to save the caregiver profile."
              }
            />
          )}
      </div>
    </div>
  );
};

export default SavedCaregivers;
