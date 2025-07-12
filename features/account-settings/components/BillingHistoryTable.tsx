"use client";

import { Subscription } from "@/types/subscription";
import { formatCurrency } from "@/lib/utils";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useToast } from "@/components/ui/use-toast";
import UloLogo from "@/public/FINAL ULO Logo_approved_main.svg";

interface BillingHistoryProps {
  history: Subscription[] | null;
}

export default function BillingHistoryTable({ history }: BillingHistoryProps) {
  const isLoading = history === null;

  const { toast } = useToast();

  const generatePDF = (entry: Subscription) => {
    const doc = new jsPDF();

    // Convert and format data
    const formatDate = (dateStr?: string) =>
      dateStr ? new Date(dateStr).toLocaleString() : "N/A";

    const currency = entry.currency || "NGN";
    const amount = formatCurrency(entry.amount / 100);
    const plan = entry.plan?.replace(/_/g, " ") || "N/A";
    const status = entry.status || "N/A";
    const logo = `data:image/png;base64,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`;
    // Header

    doc.addImage(logo, "PNG", 90, 10, 25, 10);

    doc.setFontSize(14);
    doc.text("Subscription Receipt", 105, 30, { align: "center" });

    // Add some spacing
    doc.setFontSize(11);
    doc.text(`Date of Payment: ${formatDate(entry.createdAt)}`, 14, 45);
    doc.text(`Receipt ID: ${entry.id}`, 14, 52);

    // Table of details
    autoTable(doc, {
      startY: 60,
      head: [["Field", "Value"]],
      body: [
        ["Plan", plan],
        ["Status", status],
        ["Amount Paid", `${amount} ${currency}`],
        ["Start Date", formatDate(entry?.startDate ?? undefined)],
        ["End Date", formatDate(entry?.endDate ?? undefined)],
        ["Payment Reference", entry.paystackReference || "N/A"],
        ["Auto Renew", entry.autoRenew ? "Yes" : "No"],
      ],
      theme: "striped",
      headStyles: { fillColor: [246, 170, 61] },
      styles: { fontSize: 10, cellPadding: 4 },
    });

    // Footer
    doc.setFontSize(10);
    doc.text(
      "Thank you for subscribing to UloHelps!",
      105,
      doc.internal.pageSize.height - 20,
      {
        align: "center",
      }
    );

    doc.save(`UloHelps_Receipt_${entry.id}.pdf`);
    toast({
      title: "Payment details",
      description: "Subscription payment details downloaded successfully",
      variant: "success",
    });
  };
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
                  {formatCurrency(entry.amount / 100)}
                </td>
                <td
                  className="px-6 py-4 text-base text-[#1DA5DB] font-semibold hover:underline cursor-pointer"
                  onClick={() => generatePDF(entry)}
                >
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
