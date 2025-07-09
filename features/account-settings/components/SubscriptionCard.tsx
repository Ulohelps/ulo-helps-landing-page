import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Subscription } from "@/types/subscription";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

interface SubscriptionCardProps {
  subscription: Subscription | null;
}

export default function SubscriptionCard({
  subscription,
}: SubscriptionCardProps) {
  const router = useRouter();

  function calculateDaysLeft(endDate: string): number {
    const today = new Date();
    const expiryDate = new Date(endDate);
    const timeDiff = expiryDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysLeft > 0 ? daysLeft : 0;
  }

  function formatCustomDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}.`;
  }

  if (!subscription) {
    // 🔄 Skeleton loader
    return (
      <div className="w-full rounded-[24px] animate-pulse">
        <div className="flex justify-between border border-[#E4E7EC] rounded-t-[24px]">
          <div className="flex flex-col p-6 w-2/3 space-y-2">
            <div className="h-4 w-1/2 bg-gray-300 rounded" />
            <div className="h-6 w-1/3 bg-gray-300 rounded" />
            <div className="h-3 w-1/4 bg-gray-300 rounded" />
          </div>
          <div className="flex items-center justify-end border-l border-[#E4E7EC] p-6 w-1/3">
            <div className="h-10 w-32 bg-gray-300 rounded-full" />
          </div>
        </div>
        <div className="bg-gray-100 border border-[#D0D5DD] rounded-b-[24px] p-6 flex items-center justify-between">
          <div className="h-4 w-20 bg-gray-300 rounded" />
          <div className="h-8 w-24 bg-gray-300 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-[24px]">
      <div className="flex justify-between border border-[#E4E7EC] rounded-t-[24px]">
        <div className="flex flex-col p-6 w-2/3">
          <p className="text-base text-[#344054] font-normal">
            ULO monthly subscription
          </p>
          <p className="text-2xl font-semibold text-[#06212C] mt-2">
            {formatCurrency(subscription.amount / 100)}
          </p>
          <p className="text-sm text-[#475367] font-normal mt-1">per month</p>
        </div>

        {subscription.status !== "ACTIVE" && (
          <div className="flex items-center justify-end border-l border-[#E4E7EC] p-6 w-1/3">
            <Button
              className="font-semibold"
              onClick={() => router.push("/subscriptions")}
            >
              Start your subscription
            </Button>
          </div>
        )}

        {subscription.status === "ACTIVE" && (
          <div className="flex flex-col gap-4 border-l border-[#E4E7EC] p-6 w-1/3">
            <p className="text-base text-[#344054] font-normal">Expiry date</p>
            <div>
              <p className="text-2xl text-[#06212C] font-semibold">
                {subscription?.endDate
                  ? formatCustomDate(subscription?.endDate)
                  : "--"}
              </p>
              <p className="text-sm text-[#475367] font-normal">
                {subscription?.endDate
                  ? calculateDaysLeft(subscription.endDate)
                  : "--"}{" "}
                days left
              </p>
            </div>
            <Link
              href="subscriptions/cancel-subscription"
              className="text-base text-[#CB1A14] underline font-semibold"
            >
              Cancel subscription
            </Link>
          </div>
        )}
      </div>

      <div
        className={`${
          subscription.status !== "ACTIVE" ? "bg-[#F0F2F5]" : "bg-[#E7F6EC]"
        } border border-[#D0D5DD] rounded-b-[24px] p-6 flex items-center justify-between`}
      >
        <p className="text-base text-[#344054] font-normal">Status</p>
        <Button
          className={`${
            subscription.status !== "ACTIVE"
              ? "bg-[#D0D5DD] text-[#344054]"
              : "bg-[#04802E] text-white"
          } py-2 px-6 rounded-[200px] text-lg font-semibold`}
        >
          {subscription.status !== "ACTIVE" ? "In-active" : "Active"}
        </Button>
      </div>
    </div>
  );
}
