"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/custom-modal";
import ConnectionCard from "./components/ConnectionCard";
import Header from "./components/Header";
import HeaderWrapper from "@/components/header-wrap";
import { Calendar, CircleAlert, MapPin, Wallet } from "lucide-react";
import Box from "./components/Box";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { caregiverService } from "@/lib/services/caregiverService";
import { Caregiver } from "@/types/caregiver";
import { useCareseekersStore } from "@/lib/stores/careseeker-store";
import { useToast } from "@/hooks/use-toast";
import FeedbackCard from "./components/FeedbackCard";
import Guidelines from "./components/Guidelines";

export default function CaregiverProfile({ id }: { id: string }) {
  const [connected, setConnected] = useState(false);
  const [hired, setHired] = useState(false);
  const [caregiver, setCaregiver] = useState<Caregiver | null>(null);
  const [open, setOpen] = useState(false);
  const [loadingCaregiver, setLoadingCaregiver] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [openGuidelines, setOpenGuidelines] = useState(false);

  const { profile, connectWithCaregiver } = useCareseekersStore();
  const { toast } = useToast();

  const subscriptionStatus = profile?.subscription.status === "ACTIVE";

  const handleConnectToCaregiver = async () => {
    if (!subscriptionStatus) {
      setOpen(true);
      return;
    }

    setConnecting(true);
    const response = await connectWithCaregiver(id);
    setConnecting(false);

    if (response.success) {
      toast({
        title: "Connected",
        description: `You're now connected with ${caregiver?.firstName}`,
        variant: "success",
      });
      setConnected(true);
    } else {
      toast({
        title: "Failed to connect",
        description: `Could not connect with ${caregiver?.firstName}`,
        variant: "error",
      });
    }
  };

  const fetchCaregiverDetails = async () => {
    setLoadingCaregiver(true);
    const response = await caregiverService.getSingleCaregiver(id);
    setCaregiver(response.data);
    setConnected(response.data.isConnected);
    setHired(response.data.isHired);
    setLoadingCaregiver(false);
  };

  const handleCloseSubscribe = () => {
    setOpen(false);
    // Start subscription logic
  };

  const headerContent = [
    {
      icon: <Wallet stroke="#667185" />,
      description: caregiver?.expectedMonthlySalary
        ? `NGN ${caregiver.expectedMonthlySalary.toLocaleString()}`
        : "--",
    },
    {
      icon: <Calendar stroke="#667185" strokeWidth={1.5} />,
      description:
        caregiver?.experienceLevel?.replace(/_/g, " ").toLowerCase() || "--",
    },
    {
      icon: <MapPin stroke="#667185" strokeWidth={1.5} />,
      description: `${caregiver?.lgaOfResidence || "--"}, ${
        caregiver?.stateOfResidence || "--"
      }`,
    },
  ];

  const userDetails = [
    {
      label: "Age",
      detail: caregiver?.dateOfBirth
        ? `${
            new Date().getFullYear() -
            new Date(caregiver.dateOfBirth).getFullYear()
          } years old`
        : "--",
    },
    { label: "Gender", detail: caregiver?.gender || "--" },
    { label: "Nationality", detail: "Nigeria" },
    { label: "Ethnicity", detail: caregiver?.ethnicity || "--" },
    {
      label: "Languages",
      detail: caregiver?.languagesSpoken?.join(", ") || "--",
    },
    {
      label: "Subskills",
      detail: caregiver?.subServiceTypes?.join(", ").replace(/_/g, " ") || "--",
    },
    {
      label: "Highest Level of Education",
      detail: caregiver?.educationLevel.replace(/_/g, " ") || "--",
    },
    {
      label: "Availability status",
      detail: caregiver?.currentlyAvailable || "--",
    },
    {
      label: "Open to live-in jobs?",
      detail: caregiver?.openToLiveIn ? "Yes" : "No",
    },
  ];

  useEffect(() => {
    fetchCaregiverDetails();
  }, []);

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
              Cancel
            </Button>
            <Button
              className="w-[186px] bg-[#F6AA3D] hover:bg-[#e19a32] text-[#1D2739] font-semibold"
              onClick={handleCloseSubscribe}
            >
              Start subscription
            </Button>
          </>
        }
      />

      <HeaderWrapper>
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 max-w-[1136px] mx-auto relative">
          <Header headerDetails={caregiver} isLoading={loadingCaregiver} />

          <ConnectionCard
            connected={connected}
            hired={hired}
            handleConnect={handleConnectToCaregiver}
            email={caregiver?.user?.email || "--"}
            lastName={caregiver?.lastName || "--"}
            firstName={caregiver?.firstName || "--"}
            phone={caregiver?.user?.phone || "--"}
            loading={connecting}
            setOpenGuidelines={setOpenGuidelines}
          />
        </div>
      </HeaderWrapper>

      <div className="max-w-[1136px] mx-auto mt-6 px-4 md:px-8 lg:px-12 py-8">
        {connected && !hired && !loadingCaregiver && (
          <FeedbackCard name={caregiver?.firstName || "--"} />
        )}

        <Tabs defaultValue="profileDetails" className="w-full">
          <TabsList className="w-full md:w-[65%] flex items-center justify-start">
            <TabsTrigger
              value="profileDetails"
              className="text-left text-[#475367] px-0 pb-4 text-base font-semibold w-full data-[state=active]:border-b-4 data-[state=active]:text-[#06212C] data-[state=active]:border-[#F6AA3D] rounded-none"
            >
              Profile Details
            </TabsTrigger>
            <TabsTrigger
              value="employmentHistory"
              className="text-[#475367] px-0 pb-4 text-base font-semibold w-full data-[state=active]:border-b-4 data-[state=active]:text-[#06212C] data-[state=active]:border-[#F6AA3D] rounded-none"
            >
              Employment History
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="profileDetails"
            className="w-full lg:w-[65%] mt-8"
          >
            {loadingCaregiver ? (
              <div className="space-y-4">
                <div className="h-20 bg-gray-100 rounded-md animate-pulse" />
                <div className="h-48 bg-gray-100 rounded-md animate-pulse" />
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
                  {headerContent.map((item, index) => (
                    <Box
                      key={index}
                      icon={item.icon}
                      description={item.description}
                    />
                  ))}
                </div>

                <div className="mt-4">
                  {userDetails.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-4 border-b border-[#E4E7EC]"
                    >
                      <p className="text-base text-[#475367] font-normal">
                        {detail.label}
                      </p>
                      <p className="text-base text-[#344054] font-semibold">
                        {detail.detail}
                      </p>
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-4">
                    <p className="text-base text-[#475367] font-normal">
                      Levels
                    </p>
                    <p className="flex items-center gap-2 text-base capitalize text-[#344054] font-semibold">
                      {caregiver?.literacyLevelDesc?.replace(/_/g, " ") || "--"}
                      <CircleAlert
                        className="text-[#1DA5DB]"
                        strokeWidth={1.5}
                      />
                    </p>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent
            value="employmentHistory"
            className="w-full lg:w-[65%] mt-8"
          >
            {loadingCaregiver ? (
              <div className="h-24 bg-gray-100 rounded-md animate-pulse" />
            ) : (
              caregiver?.previousEmployers?.map((employer, index) => (
                <div key={index}>
                  <h2 className="text-base text-[#344054] font-semibold">
                    {employer.role}
                  </h2>
                  <p className="text-sm text-[#667185] font-normal mt-2">
                    {employer.startDate}-{employer.endDate}
                  </p>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Guidelines
        open={openGuidelines}
        onClose={() => setOpenGuidelines(false)}
      />
    </div>
  );
}
