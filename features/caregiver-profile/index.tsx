"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/custom-modal";
import ConnectionCard from "./components/ConnectionCard";
import Header from "./components/Header";
import HeaderWrapper from "@/components/header-wrap";
import {
  Calendar,
  CircleAlert,
  MapPin,
  Phone,
  Users,
  Wallet,
} from "lucide-react";
import Box from "./components/Box";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { caregiverService } from "@/lib/services/caregiverService";
import { Caregiver } from "@/types/caregiver";
import { useCareseekersStore } from "@/lib/stores/careseeker-store";
import { useToast } from "@/hooks/use-toast";
import FeedbackCard from "./components/FeedbackCard";
import Guidelines from "./components/Guidelines";
import { useRouter } from "next/navigation";
import SettingsModal from "../account-settings/components/SettingsModal";

export default function CaregiverProfile({ id }: { id: string }) {
  const [connected, setConnected] = useState(false);
  const [hired, setHired] = useState(false);
  const [caregiver, setCaregiver] = useState<Caregiver | null>(null);
  const [open, setOpen] = useState(false);
  const [loadingCaregiver, setLoadingCaregiver] = useState(true);
  const [loading, setLoading] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [openGuidelines, setOpenGuidelines] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(caregiver?.isBookmarked);
  const [isGuarantor, setIsGuarantor] = useState(false);
  const [openGuarantor, setOpenGuarantor] = useState(false);

  const { profile, connectWithCaregiver } = useCareseekersStore();

  const { toast } = useToast();

  const { push } = useRouter();

  const subscriptionStatus =
    profile?.subscription && profile?.subscription.status === "ACTIVE";

  const handleConnectToCaregiver = async () => {
    if (!profile?.subscription || !subscriptionStatus) {
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
      fetchCaregiverDetails();
    } else {
      toast({
        title: "Failed to connect",
        description: `Could not connect with ${caregiver?.firstName}`,
        variant: "error",
      });
    }
  };

  const handleGetGuarantor = async () => {
    setLoading(true);
    try {
      await caregiverService.getCaregiverGuarantor(id);
      toast({
        title: "successfully",
        description: "fetched guarantor",
        variant: "success",
      });
      setLoading(false);
      setIsGuarantor(true);
      fetchCaregiverDetails();
      setOpenGuarantor(false);
    } catch (error) {
      toast({
        title: "failed",
        description: `${error || "Could not fetch Guarantor, try again"}`,
        variant: "error",
      });
      setLoading(false);
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
    push("/subscriptions");
    setOpen(false);
  };

  const handleBookmarkToggle = useCallback(async () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);

    try {
      const action = newBookmarkState
        ? caregiverService.bookmarkCaregiver
        : caregiverService.unbookmarkCaregiver;

      await action(id);

      toast({
        title: newBookmarkState ? "Bookmark added" : "Bookmark removed",
        description: newBookmarkState
          ? "Caregiver has been bookmarked"
          : "Caregiver has been removed from bookmarks",
        variant: "success",
      });
      fetchCaregiverDetails();
    } catch (error) {
      console.error("Error updating bookmark:", error);
      setIsBookmarked(!newBookmarkState); // Revert on error
      toast({
        title: "Error",
        description: "Failed to update bookmark status",
        variant: "error",
      });
    }
  }, [isBookmarked, id, toast]);

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
      detail:
        caregiver?.subServiceTypes
          ?.join(", ")
          .replace(/_/g, " ")
          .toLocaleLowerCase() || "--",
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

  const getLiteracyLevel = (value: string) => {
    switch (value) {
      case "BASIC_ENGLISH":
        return "Level one";
        break;
      case "CONVERSATIONAL_ENGLISH":
        return "Level two";
        break;
      case "FLUENT_ENGLISH":
        return "Level three";
        break;

      default:
        return "Level one";
        break;
    }
  };

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
        <div className="flex flex-col lg:flex-row items-center gap-6 max-w-[1136px] mx-auto relative">
          <Header headerDetails={caregiver} isLoading={loadingCaregiver} />

          <ConnectionCard
            connected={connected}
            connectDate={caregiver?.connectedAt || ""}
            hiredDate={caregiver?.hiredAt || ""}
            hired={hired}
            handleConnect={handleConnectToCaregiver}
            email={caregiver?.user?.email || "--"}
            lastName={caregiver?.lastName || "--"}
            firstName={caregiver?.firstName || "--"}
            phone={caregiver?.user?.phone || "--"}
            loading={connecting}
            setOpenGuidelines={setOpenGuidelines}
            saved={caregiver?.isBookmarked ?? false}
            handleSaveCaregiver={handleBookmarkToggle}
          />
        </div>
      </HeaderWrapper>

      <div className="max-w-[1136px] mx-auto mt-6 py-8">
        {connected && !hired && !loadingCaregiver && (
          <FeedbackCard
            name={caregiver?.firstName || "--"}
            connectId={caregiver?.connectionId || ""}
          />
        )}

        <Tabs defaultValue="profileDetails" className="w-full">
          <TabsList className="w-full md:w-[65%] flex items-center justify-start gap-5 border-b border-[#E4E7EC]">
            <TabsTrigger
              value="profileDetails"
              className="text-left text-[#475367] px-0 pb-4 text-base font-semibold data-[state=active]:border-b-4 data-[state=active]:text-[#06212C] data-[state=active]:border-[#F6AA3D] rounded-t-[4px]"
            >
              Profile Details
            </TabsTrigger>
            <TabsTrigger
              value="employmentHistory"
              className="text-[#475367] px-0 pb-4 text-base font-semibold data-[state=active]:border-b-4 data-[state=active]:text-[#06212C] data-[state=active]:border-[#F6AA3D] rounded-none"
            >
              Employment History
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="profileDetails"
            className="w-full lg:w-[65%] mt-8 p-0"
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
                      <p
                        className={`text-base text-[#344054]  font-semibold ${
                          detail.label === "Subskills" &&
                          "flex items-center w-[60%] overflow-hidden text-right overflow-x-scroll scrollbar-hide capitalize"
                        } `}
                      >
                        {detail.detail}
                      </p>
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-4">
                    <p className="text-base text-[#475367] font-normal">
                      Levels
                    </p>
                    <p className="flex items-center gap-2 text-base capitalize text-[#344054] font-semibold">
                      {getLiteracyLevel(caregiver?.literacyLevelDesc || "--")}
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
            className="w-full lg:w-[65%] mt-8 p-0"
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
            {!isGuarantor && (
              <Button
                variant="outline"
                className="font-semibold px-6 py-3 mt-8"
                onClick={() => setOpenGuarantor(true)}
              >
                Display Guarantor details
              </Button>
            )}
            {isGuarantor && (
              <div className="mt-8">
                <h3 className="text-base font-semibold border-b border-[#E4E7EC] pb-5">
                  Guarantor details
                </h3>
                <div className="mt-6 space-y-4">
                  <h4 className="text-base text-[#344054] font-semibold">
                    {caregiver?.guarantors?.name}
                  </h4>
                  <div className="flex item-center gap-3">
                    <Users
                      width={24}
                      height={24}
                      className="text-[#475367] font-semibold"
                    />
                    <p className="text-[#344054] text-base">
                      {caregiver?.guarantors?.relationship}
                    </p>
                  </div>
                  <div className="flex item-center gap-3">
                    <Phone
                      width={24}
                      height={24}
                      className="text-[#475367] font-semibold"
                    />
                    <p className="text-[#344054] text-base">
                      {caregiver?.guarantors?.phone}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Guidelines
        open={openGuidelines}
        onClose={() => setOpenGuidelines(false)}
      />

      <SettingsModal
        open={openGuarantor}
        onClose={() => setOpenGuarantor(false)}
        title={"Important notice"}
        onConfirm={handleGetGuarantor}
        loading={loading}
        children={
          <p>
            For data privacy reasons, we only reveal caregivers’ guarantor
            information in the event of criminal offenses or similar occurrences
            involving the caregiver while they’re in your employ. If a situation
            like this has taken place, kindly describe it below so that our team
            can support you through the next process and take necessary actions.
          </p>
        }
        btnText2={"I agree to the terms"}
        btnText1={"cancel"}
      />
    </div>
  );
}
