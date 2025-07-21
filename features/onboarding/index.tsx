"use client";
import React, { useState } from "react";
import HeaderWrapper from "@/components/header-wrap";
import { useCareseekersStore } from "@/lib/stores/careseeker-store";
import { careseekersService } from "@/lib/services/careseekersService";
import {
  NannyIcon,
  PetCareICon,
  DriverICon,
  ChefICon,
  ElderCareICon,
  HousekeeperICon,
  LaundryICon,
  CleanerIcon,
} from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { title } from "process";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

const SERVICE_LIST = [
  {
    label: "Nanny",
    value: "CHILDCARE_NANNY",
    icon: <NannyIcon />,
    color: "#0E92C7",
  },
  {
    label: "Cleaner",
    value: "CLEANER",
    icon: <CleanerIcon />,
    color: "#009987",
  },
  {
    label: "Housekeeper",
    value: "HOUSEKEEPER",
    icon: <HousekeeperICon />,
    color: "#8F76B8",
  },
  { label: "Chef", value: "CHEF", icon: <ChefICon />, color: "#F1473C" },
  { label: "Driver", value: "DRIVER", icon: <DriverICon />, color: "#0D5EBA" },
  {
    label: "Pet care",
    value: "PET_CARE",
    icon: <PetCareICon />,
    color: "#C28400",
  },
  {
    label: "Elder care",
    value: "ELDER_CARE",
    icon: <ElderCareICon />,
    color: "#E74A8A",
  },
  {
    label: "Laundry man",
    value: "LAUNDRY_WASHER",
    icon: <LaundryICon />,
    color: "#AB5BA6",
  },
];

const Onboarding = () => {
  const [error, setError] = useState("");
  const { profile, fetchProfile } = useCareseekersStore();
  const [service, setService] = useState(profile?.primaryService);

  const { toast } = useToast();

  const router = useRouter();

  const handleSubmit = async () => {
    if (!service) {
      setError("Please select a service.");
      return;
    }

    try {
      await careseekersService.prefferedServiceType({
        primaryService: service,
      });
      toast({
        title: "success",
        description: "Primary service selected successfully",
        variant: "success",
      });
      fetchProfile();
      router.push("/dashboard");
    } catch (err) {
      toast({
        title: "failed",
        description: "failed to update primary service",
        variant: "error",
      });
    }
  };

  const handleSelect = (value: string) => {
    setService(value);
    setError("");
  };

  if (profile && !profile.primaryService) {
    return null;
  }

  return (
    <div>
      <HeaderWrapper>
        <div className="max-w-[1136px] mx-auto py-8">
          <h1 className="text-2xl lg:text-[28px] text-[#06212C] font-semibold">
            Welcome to ULO, {profile?.firstName}👋
          </h1>
          <p className="text-base w-full md:w-1/2 lg:text-lg font-normal text-[#344054] mt-2">
            To get started, please tell us what type of service you’re looking
            for. This helps us suggest caregivers that fit your exact need.
          </p>
        </div>
      </HeaderWrapper>

      <div>
        <div className="max-w-[1136px] mx-auto my-12">
          <div className="flex flex-col items-center">
            <div className="max-w-[750px] w-full space-y-6">
              {SERVICE_LIST.map((item) => (
                <div
                  key={item.value}
                  onClick={() => handleSelect(item.value)}
                  className={`flex items-center justify-between gap-4 w-full border ${
                    service === item.value
                      ? "border-[#344054] shadow-[0px_0px_0px_3px_#3440544D]"
                      : "border-[#E4E7EC]"
                  } rounded-[24px] p-6 cursor-pointer transition-all`}
                >
                  <div className="flex items-center gap-4 ">
                    <div
                      className="w-12 h-12 flex items-center justify-center rounded-full"
                      style={{ backgroundColor: `${item.color}1A` }}
                    >
                      {item.icon}
                    </div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </p>
                  </div>
                  {service === item.value && <Check />}
                </div>
              ))}

              {error && (
                <p className="text-red-500 text-sm text-center mt-2">{error}</p>
              )}

              <div className="flex items-center justify-center pt-4">
                <Button onClick={handleSubmit}>Continue to ULO</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
