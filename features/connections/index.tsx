"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import EmptyConnections from "./components/EmptyConnections";
import HeaderWrapper from "@/components/header-wrap";

export default function Connections() {
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
            <EmptyConnections
              title="You haven’t connected with any caregivers"
              description="Explore and connect with caregivers on the ULO platform by clicking the button below."
            />
          </TabsContent>

          {/* Hired Tab Content */}
          <TabsContent value="hired">
            <EmptyConnections
              title="You aren’t currently hiring any caregivers"
              description="Caregivers you connect with and hire on the ULO platform will show up here."
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
