"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PaymentDetailsForm() {
  return (
    <Card className="w-full lg:w-[60%] border-[#E4E7EC] rounded-[24px] p-0 overflow-hidden">
      <CardHeader className="p-6 border-b border-[#E4E7EC] bg-[#F7F9FC]">
        <h2 className="text-xl font-bold text-[#344054]">Payment details</h2>
      </CardHeader>

      <CardContent className=" p-6 space-y-5">
        {/* Card Info */}
        <div className="space-y-6">
          <h4 className="text-base text-[#344054] font-semibold mb-2">
            Card information
          </h4>
          <div className="grid gap-2">
            <Label className="text-sm text-[#344054]">Card number</Label>
            <Input
              className="border border-[#D0D5DD] rounded-[12px] py-3 px-4 text-[#98A2B3] font-normal"
              placeholder="1234 1234 1234 1234"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-sm text-[#344054]">Expiry date</Label>
              <Input
                className="border border-[#D0D5DD] rounded-[12px] text-[#98A2B3]  px-4 py-3 font-normal"
                placeholder="MM/YY"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-sm text-[#344054]">CVV</Label>
              <Input
                className="border border-[#D0D5DD] rounded-[12px]  px-4 py-3 text-[#98A2B3] font-normal"
                placeholder="123"
              />
            </div>
          </div>
        </div>

        {/* Billing Info */}
        <div className="space-y-6">
          <h4 className="text-base text-[#344054] font-semibold mb-2">
            Billing information
          </h4>
          <div className="grid gap-2">
            <Label className="text-sm text-[#344054]">Billed to</Label>
            <Input
              className="border border-[#D0D5DD] rounded-[12px]  px-4 py-3 t text-[#98A2B3] font-normal"
              placeholder="Nkechi Williams"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-sm text-[#344054]">Country</Label>
              <Select>
                <SelectTrigger className="border border-[#D0D5DD] rounded-[12px] px-4 py-3 text-sm text-[#98A2B3] font-normal">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-[24px] text-sm text-[#344054]">
                  <SelectItem value="NG">Nigeria</SelectItem>
                  <SelectItem value="GH">Ghana</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label className="text-sm text-[#344054]">ZIP Code</Label>
              <Input
                className="border border-[#D0D5DD] rounded-[12px] px-4 py-3 text-sm text-[#98A2B3] font-normal"
                placeholder="ZIP Code"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm text-[#344054]">Billing address</Label>
            <Input
              className="border border-[#D0D5DD] rounded-[12px]  px-4 py-3 text-[#98A2B3] font-normal"
              placeholder="Enter billing address"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
