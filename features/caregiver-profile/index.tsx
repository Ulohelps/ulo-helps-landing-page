"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/custom-modal";
import ConnectionCard from "./components/ConnectionCard";
import Header from "./components/Header";

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
          <Header />
          {/* RIGHT: Contact Card */}
          <ConnectionCard connected={connected} handleConnect={handleConnect} />
        </div>
      </div>
    </div>
  );
}
