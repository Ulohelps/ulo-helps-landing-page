"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SkeletonCard from "@/features/find-caregivers/components/CaregiverSkeleton";
import EmptyConnections from "./components/EmptyConnections";
import HeaderWrapper from "@/components/header-wrap";
import { useCareseekersStore } from "@/lib/stores/careseeker-store";
import { useEffect, useState } from "react";
import { Caregiver } from "@/types/caregiver";
import { CaregiverCard } from "@/components/CaregiverCard";

interface ConnectionsProps {
  connectionId: string;
  caregiver: Caregiver;
  connectedAt: string;
}

export default function Connections() {
  const [connectedCaregivers, setConnectedcaregivers] = useState<
    ConnectionsProps[] | null
  >(null);
  const [hiredCaregivers, setHiredcaregivers] = useState<Caregiver[] | null>(
    null
  );

  const { getConnectedCaregivers, getHiredCaregivers } = useCareseekersStore();

  // Fetch connected caregivers on mount
  const fetchConnectedCaregivers = async () => {
    const res = await getConnectedCaregivers();
    setConnectedcaregivers(res.data);
  };

  const fetchHiredCaregivers = async () => {
    const res = await getHiredCaregivers();
    setHiredcaregivers(res.data);
    console.log(res);
  };

  useEffect(() => {
    fetchConnectedCaregivers();
    fetchHiredCaregivers();
  }, []);

  return (
    <div className="relative w-full">
      {/* Header Section */}
      <HeaderWrapper>
        <div className="max-w-[1136px] mx-auto pb-16">
          <h1 className="text-2xl lg:text-[28px] text-[#06212C] font-semibold">
            My Connections
          </h1>
        </div>
      </HeaderWrapper>

      {/* Tabs Section */}
      <div className="max-w-[1136px] mx-auto px-4 md:px-8 lg:px-12 mt-12 relative">
        <Tabs defaultValue="active" className="w-full">
          {/* Absolute TabsList with relative parent */}
          <div className="relative h-12 mb-16">
            {" "}
            {/* This helps to reserve space */}
            <TabsList className="absolute -top-[83px] left-0 right-0 bg-transparent  rounded-none px-0">
              <TabsTrigger
                value="active"
                className="text-[#475367] px-0 text-base font-semibold w-full data-[state=active]:border-b-4 data-[state=active]:text-[#06212C] data-[state=active]:border-[#F6AA3D] rounded-none"
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="hired"
                className="text-[#475367] px-0 font-semibold w-full data-[state=active]:border-b-4 data-[state=active]:text-[#06212C] data-[state=active]:border-[#F6AA3D] rounded-none"
              >
                Hired
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Active Tab Content */}
          <TabsContent value="active">
            {Array.isArray(connectedCaregivers) &&
              connectedCaregivers.length < 0 && (
                <EmptyConnections
                  title="You haven’t connected with any caregivers"
                  description="Explore and connect with caregivers on the ULO platform by clicking the button below."
                />
              )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1136px] mx-auto px-2 my-8">
              {connectedCaregivers === null
                ? Array.from({ length: 4 }).map((_, idx) => (
                    <SkeletonCard key={idx} />
                  ))
                : Array.isArray(connectedCaregivers) &&
                  connectedCaregivers.length > 0 &&
                  connectedCaregivers.map((caregiver) => (
                    <CaregiverCard
                      key={caregiver.caregiver.id}
                      caregiver={caregiver.caregiver}
                    />
                  ))}
            </div>
          </TabsContent>

          {/* Hired Tab Content */}
          <TabsContent value="hired">
            {Array.isArray(hiredCaregivers) && hiredCaregivers.length < 0 && (
              <EmptyConnections
                title="You aren’t currently hiring any caregivers"
                description="Caregivers you connect with and hire on the ULO platform will show up here."
              />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1136px] mx-auto px-2 my-8">
              {hiredCaregivers === null
                ? Array.from({ length: 4 }).map((_, idx) => (
                    <SkeletonCard key={idx} />
                  ))
                : Array.isArray(hiredCaregivers) &&
                  hiredCaregivers.length > 0 &&
                  hiredCaregivers.map((caregiver) => (
                    <CaregiverCard key={caregiver.id} caregiver={caregiver} />
                  ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
