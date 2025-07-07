"use client";
import HeaderWrapper from "@/components/header-wrap";
import React, { use, useEffect } from "react";
import EmptySaveCaregivers from "./components/EmptyConnections";
import { caregiverService } from "@/lib/services/caregiverService";

const SavedCaregivers = () => {
  const { getBookmarkedCaregivers } = caregiverService;

  // Fetch bookmarked caregivers
  const fetchBookmarkedCaregivers = async () => {
    try {
      const response = await getBookmarkedCaregivers();
      // Handle the response as needed
      console.log(response.data);
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
        <EmptySaveCaregivers
          title={"You haven’t saved any caregiver profiles"}
          description={
            "Use the bookmark icon on caregiver profile cards to save the caregiver profile."
          }
        />
      </div>
    </div>
  );
};

export default SavedCaregivers;
