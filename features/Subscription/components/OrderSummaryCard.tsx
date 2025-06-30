import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle, RotateCcw, TriangleAlert } from "lucide-react";

export default function OrderSummaryCard() {
  return (
    <Card className="w-full flex-shrink-0 lg:w-[40%] border-[#E4E7EC] rounded-[24px] p-0 overflow-hidden">
      <CardHeader className="p-6 border-b border-[#E4E7EC] bg-[#F7F9FC]">
        <h2 className="text-xl font-bold text-[#344054]">Order summary</h2>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        {/* Promo Code */}
        <div className="grid gap-1 px-6 my-6">
          <Label className="text-sm text-[#344054]">Promo code</Label>
          <div className="flex items-center gap-2 border border-[#D0D5DD] rounded-[12px] py-3 px-4">
            <Input
              placeholder="Enter promo code"
              className="text-[#98A2B3] font-normal border-none p-0"
            />
            <Button
              variant="ghost"
              className="text-base text-[#1DA5DB] font-semibold p-0"
            >
              Apply
            </Button>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex justify-between text-sm text-[#06212C] font-medium px-6">
          <span className="text-sm text-[#475367] font-normal">
            Monthly subscription
          </span>
          <span className="text-base text-[#344054] font-semibold">
            NGN 30,000
          </span>
        </div>
        <div className="flex justify-between text-sm text-[#06212C] px-6">
          <span className="text-sm text-[#475367] font-normal">Discount</span>
          <span className="text-base text-[#344054] font-semibold">NGN 0</span>
        </div>

        {/* Pay Button */}
        <div className="mt-2 border-t border-[#E4E7EC] px-6 pt-6">
          <div className="flex justify-between text-sm text-[#06212C]">
            <span className="text-sm text-[#475367] font-normal">
              Total due today
            </span>
            <span className="text-base text-[#344054] font-semibold">
              NGN 30,000
            </span>
          </div>
          <Button className="w-full px-6 py-3 mt-6">Pay NGN 30,000 now</Button>
        </div>

        {/* Notes */}
        <div className="text-xs mt-2 space-y-1 text-[#475367] pb-6">
          <div className="flex items-center justify-center gap-2 text-center">
            <RotateCcw
              strokeWidth={1.5}
              stroke="#F6AA3D"
              height={15}
              width={15}
            />
            <span>Automatically renews every month on the 13th.</span>
          </div>
          <div className="flex items-start gap-2 justify-center">
            <TriangleAlert
              strokeWidth={1.5}
              height={15}
              width={15}
              stroke="#F6AA3D"
            />
            <span>You can cancel your subscription any time</span>
          </div>
          <div className="flex items-start gap-2 justify-center">
            <CheckCircle size={14} className="text-blue-500 mt-[2px]" />
            <span>Checkout secured by Paystack</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
