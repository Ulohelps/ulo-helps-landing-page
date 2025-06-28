"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/custom-modal";
import ConnectionCard from "./components/ConnectionCard";
import Header from "./components/Header";
import HeaderWrapper from "@/components/header-wrap";
import { Calendar, CircleAlert, MapPin, Wallet } from "lucide-react";
import Box from "./components/Box";

const headerContent = [
  {
    icon: <Wallet stroke="#667185" />,
    description: "NGN 50k- 80k",
  },
  {
    icon: <Calendar stroke="#667185" strokeWidth={1.5} />,
    description: "5 years experience",
  },
  {
    icon: <MapPin strokeWidth={1.5} stroke="#667185" />,
    description: "Ojodu, Lagos",
  },
];

const userDetails = [
  { label: "Age", detail: "29 years old" },
  { label: "Gender", detail: "Female" },
  { label: "Nationality", detail: "Nigerian" },
  { label: "Ethnicity", detail: "Yoruba" },
  { label: "Languages", detail: "English, Yoruba" },
  { label: "Subskills", detail: "Singing, Driving" },
  { label: "Highest Level of Education", detail: "OND" },
  { label: "Availability status", detail: "Available for full time work" },
  { label: "Open to live-in jobs?", detail: "Yes" },
];

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
      <HeaderWrapper>
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 max-w-[1136px] mx-auto relative">
          <Header />
          {/* RIGHT: Contact Card */}
          <ConnectionCard connected={connected} handleConnect={handleConnect} />
        </div>
      </HeaderWrapper>
      <div className="max-w-[1136px] mx-auto mt-8 px-4 md:px-8 lg:px-12 py-8">
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between w-full lg:w-[65%]">
          {headerContent.map((content, idx) => (
            <Box
              key={idx}
              icon={content.icon}
              description={content.description}
            />
          ))}
        </div>
        <div className="w-full lg:w-[65%]">
          {userDetails.map((detail) => (
            <div className="flex items-center justify-between py-4 border-b border-[#E4E7EC]">
              <p className="text-base text-[#475367] font-normal">
                {detail.label}
              </p>
              <p className="text-base text-[#344054] font-semibold">
                {detail.detail}
              </p>
            </div>
          ))}
          <div className="flex items-center justify-between py-4">
            <p className="text-base text-[#475367] font-normal">Levels</p>
            <p className="flex items-center gap-2 text-base text-[#344054] font-semibold">
              Level 1{" "}
              <CircleAlert className="text-[#1DA5DB]" strokeWidth={1.5} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
