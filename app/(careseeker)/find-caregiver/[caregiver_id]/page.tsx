import CaregiverProfile from "@/features/caregiver-profile";
import React from "react";

interface CaregiverProfilePageProps {
  params: { caregiver_id: string };
}

const CaregiverProfilePage = ({ params }: CaregiverProfilePageProps) => {
  const { caregiver_id } = params;
  return (
    <div>
      <CaregiverProfile id={caregiver_id} />
    </div>
  );
};

export default CaregiverProfilePage;
