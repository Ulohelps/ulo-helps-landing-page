"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import User from "@/public/images/Image.png";
import GuardIcon from "@/public/icons/gaurd.svg";

import CustomModal from "@/components/custom-modal";
import { useState } from "react";
import ConnectionCard from "./components/ConnectionCard";

export default function CaregiverProfile() {
  const [connected, setConnected] = useState(false);
  const [isSubscribed, SetIsSubscribed] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubscribe = () => {
    // logic to start subscription
    setOpen(false);
    SetIsSubscribed(true);
    setConnected(true);
  };
  const handleConnect = () => {
    if (isSubscribed) {
      setConnected(true);
    } else {
      setOpen(true);
    }
  };
  return (
    <div>
      <CustomModal
        open={open}
        success={false}
        onClose={() => setOpen(false)}
        title="You don’t have an active subscription"
        description="Start a 1-month ULO subscription to connect with caregivers. To get started, click the 'Start subscription' button below and proceed to make payment of NGN30,000 only."
        buttons={
          <>
            <Button
              variant="outline"
              className="w-[103px] bg-white"
              onClick={() => setOpen(false)}
            >
              cancel
            </Button>
            <Button
              className="w-[186px] bg-[#F6AA3D] hover:bg-[#e19a32] text-[#1D2739] font-semibold"
              onClick={handleSubscribe}
            >
              Start subscription
            </Button>
          </>
        }
      />
      <div className="bg-[#E9F6FC] w-full px-4 md:px-8 lg:px-12 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 max-w-[1136px] mx-auto relative">
          <div className="flex flex-col items-center md:flex-row gap-4 lg:w-[70%]">
            <div className="w-[266px] min-h-[288px] relative overflow-hidden border border-gray-300">
              <Image
                src={User}
                alt="Caregiver name"
                width={120}
                height={120}
                className="object-cover w-full h-full "
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold text-[#1D2739]">
                  Oluwatosin Johnson
                </h2>
                <Image src={GuardIcon} alt="guard icon" />
              </div>
              <p className="text-[#475367] text-base mb-2">Housekeeper</p>
              <p className="max-w-[446px] text-[#667085] text-base leading-relaxed">
                I’ve worked as a housekeeper for over 7 years, supporting busy
                families and elderly clients with cleaning, cooking, and
                errands. I’m known for being dependable, friendly, and quick to
                notice what needs to be done without being asked...
              </p>
            </div>
          </div>
          {/* RIGHT: Contact Card */}
          <ConnectionCard connected={connected} handleConnect={handleConnect} />
        </div>
      </div>
    </div>
  );
}
