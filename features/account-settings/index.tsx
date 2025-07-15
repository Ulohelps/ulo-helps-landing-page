"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import HeaderWrapper from "@/components/header-wrap";
import ProfileSetting from "./components/ProfileSetting";
import SecuritySettings from "./components/SecuritySettings";
import SubscriptionManagement from "./components/SubscriptionManagement";
import NotificationPreferences from "./components/NotificationPreferences";

export default function AccountSettings() {
  return (
    <div className="relative w-full">
      {/* Header Section */}
      <HeaderWrapper>
        <div className="max-w-[1136px] mx-auto py-12">
          <h1 className="text-2xl lg:text-[28px] text-[#06212C] font-semibold">
            Account Settings
          </h1>
        </div>
      </HeaderWrapper>

      {/* Tabs Section */}
      <div className="max-w-[1136px] mx-auto relative px-4 md:px-0">
        <Tabs defaultValue="profile" className="w-full">
          <div className="absolute inset-x-0 -top-[42px] overflow-x-auto scrollbar-hide">
            <TabsList className="flex w-max justify-center md:justify-between min-w-full gap-4 px-4 md:px-0">
              <TabsTrigger
                value="profile"
                className="text-[#475367] text-sm md:text-base font-semibold whitespace-nowrap data-[state=active]:border-b-4 data-[state=active]:text-[#06212C] data-[state=active]:border-[#F6AA3D] rounded-none"
              >
                Profile information
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="text-[#475367] text-sm md:text-base font-semibold whitespace-nowrap data-[state=active]:border-b-4 data-[state=active]:text-[#06212C] data-[state=active]:border-[#F6AA3D] rounded-none"
              >
                Security settings
              </TabsTrigger>
              <TabsTrigger
                value="subscription"
                className="text-[#475367] text-sm md:text-base font-semibold whitespace-nowrap data-[state=active]:border-b-4 data-[state=active]:text-[#06212C] data-[state=active]:border-[#F6AA3D] rounded-none"
              >
                Subscription management
              </TabsTrigger>
              <TabsTrigger
                value="notification"
                className="text-[#475367] text-sm md:text-base font-semibold whitespace-nowrap data-[state=active]:border-b-4 data-[state=active]:text-[#06212C] data-[state=active]:border-[#F6AA3D] rounded-none"
              >
                Notification preferences
              </TabsTrigger>
            </TabsList>
          </div>

          {/* PROFILE Tab Content */}
          <TabsContent value="profile">
            <ProfileSetting />
          </TabsContent>

          {/* Security Tab Content */}
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>

          {/* Subscription Tab Content */}
          <TabsContent value="subscription">
            <SubscriptionManagement />
          </TabsContent>

          {/* Notification Tab Content */}
          <TabsContent value="notification">
            <NotificationPreferences />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
