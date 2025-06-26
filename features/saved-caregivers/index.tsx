"use client";
import HeaderWrapper from "@/components/header-wrap";
import React from "react";
import EmptySaveCaregivers from "./components/EmptyConnections";

const SavedCaregivers = () => {
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
