import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { subscriptionService } from "@/lib/services/subscriptionService";
import { use, useEffect } from "react";

export default function SubscriptionCard() {
  const router = useRouter();

  const handleGetCurrentSubscription = async () => {
    try {
      await subscriptionService.getCurrenctSubscription();
    } catch (error) {
      console.error("Failed to start subscription:", error);
      // Handle error appropriately, e.g., show a toast notification
    }
  };

  useEffect(() => {
    handleGetCurrentSubscription();
  }, []);

  return (
    <div className="w-full  rounded-[24px]">
      <div className="flex justify-between border border-[#E4E7EC] rounded-t-[24px]">
        <div className="flex flex-col p-6 w-2/3">
          <p className="text-base text-[#344054] font-normal">
            ULO monthly subscription
          </p>
          <p className="text-2xl font-smeibold text-[#06212C] mt-2">
            NGN30,000
          </p>
          <p className="text-sm text-[#475367] font-normal mt-1">per month</p>
        </div>
        <div className="flex items-center justify-end border-l border-[#E4E7EC] p-6 w-1/3">
          <Button
            className="font-semibold"
            onClick={() => router.push("/subscriptions")}
          >
            Start your subscription
          </Button>
        </div>
      </div>

      <div className="bg-[#F0F2F5] border border-[#D0D5DD] rounded-b-[24px] p-6 flex items-center justify-between">
        <p className="text-base text-[#344054] font-normal">Status</p>
        <Button className="bg-[#D0D5DD] py-2 px-6 rounded-[200px] text-lg text-[#344054] font-semibold">
          In-active
        </Button>
      </div>
    </div>
  );
}
