"use client";
import SubscriptionCard from "./SubscriptionCard";
import SubscriptionStatusCard from "./SubscriptionStatusCard";
import { SubscriptionResponse } from "@/types/subscription";
import { useCareseekersStore } from "@/lib/stores/careseeker-store";
import BillingHistoryTable from "./BillingHistoryTable";
import { useEffect, useState } from "react";

export default function SubscriptionManagement() {
  const [currentSub, setCurrentSub] = useState<SubscriptionResponse | null>(
    null
  );
  const { getCurrentSubscription } = useCareseekersStore();

  const handleGetCurrentSubscription = async () => {
    const subscription = await getCurrentSubscription();
    console.log("Current Subscription:", subscription);
    setCurrentSub(subscription.data);
  };

  useEffect(() => {
    handleGetCurrentSubscription();
  }, []);

  return (
    <div className="w-full">
      <SubscriptionCard subscription={currentSub?.subscription ?? null} />

      {/* Billing History */}
      <BillingHistoryTable history={currentSub?.billingHistory ?? null} />
    </div>
  );
}
