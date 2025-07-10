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
  const [loading, setLoading] = useState<boolean>(true); // ✅ track loading
  const { getCurrentSubscription } = useCareseekersStore();

  const handleGetCurrentSubscription = async () => {
    try {
      const subscription = await getCurrentSubscription();
      setCurrentSub(subscription.data);
    } catch (error) {
      console.error("Failed to fetch subscription:", error);
    } finally {
      setLoading(false); // ✅ stop loading regardless of success or failure
    }
  };

  useEffect(() => {
    handleGetCurrentSubscription();
  }, []);

  return (
    <div className="w-full">
      {/* ✅ Pass loading to SubscriptionCard */}
      <SubscriptionCard
        subscription={currentSub?.subscription ?? null}
        isLoading={loading}
      />

      {/* ✅ Show billing history only after loading completes */}
      {!loading && (
        <BillingHistoryTable history={currentSub?.billingHistory ?? null} />
      )}
    </div>
  );
}
