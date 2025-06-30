import SubscriptionCard from "./SubscriptionCard";
import SubscriptionStatusCard from "./SubscriptionStatusCard";
import BillingHistoryTable from "./BillingHistoryTable";

export default function SubscriptionManagement() {
  return (
    <div className="w-full">
      <SubscriptionCard />

      {/* Billing History */}
      <BillingHistoryTable />
    </div>
  );
}
