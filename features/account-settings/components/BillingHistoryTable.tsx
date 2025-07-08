import { Subscription } from "@/types/subscription";

interface BillingHistoryProps {
  history: Subscription[] | null;
}

export default function BillingHistoryTable({ history }: BillingHistoryProps) {
  const isLoading = history === null;

  return (
    <div className="mt-8 border border-[#E4E7EC] rounded-[24px]">
      <h2 className="p-6 text-xl font-semibold text-[#344054]">
        Billing history
      </h2>
      <table className="w-full">
        <thead>
          <tr className="text-sm text-[#667185] text-left border-y border-[#E4E7EC]">
            <th className="px-6 py-4">DATE</th>
            <th className="px-6 py-4">AMOUNT</th>
            <th className="px-6 py-4"></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            // 🔄 Skeleton rows
            Array.from({ length: 3 }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="px-6 py-4">
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-16 bg-gray-300 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-32 bg-gray-300 rounded"></div>
                </td>
              </tr>
            ))
          ) : history.length > 0 ? (
            history.map((entry, i) => (
              <tr key={i}>
                <td className="px-6 py-4 text-base text-[#344054] font-normal">
                  {entry.endDate
                    ? new Date(entry.endDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : ""}
                </td>
                <td className="px-6 py-4 text-base text-[#344054] font-normal">
                  {entry.amount}
                </td>
                <td className="px-6 py-4 text-base text-[#1DA5DB] font-semibold hover:underline cursor-pointer">
                  Download receipt
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="px-6 py-4 text-[#667185] text-center">
                No billing history available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
