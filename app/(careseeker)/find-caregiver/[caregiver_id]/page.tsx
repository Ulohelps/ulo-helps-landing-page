"use client";
import CaregiverProfile from "@/features/caregiver-profile";
import React, { use } from "react";

interface CaregiverProfilePageProps {
  params: { caregiver_id: string };
}

const CaregiverProfilePage = ({
  params,
}: {
  params: Promise<{ caregiver_id: string }>;
}) => {
  const { caregiver_id } = use(params);
  return (
    <div>
      <CaregiverProfile id={caregiver_id} />
    </div>
  );
};

export default CaregiverProfilePage;
