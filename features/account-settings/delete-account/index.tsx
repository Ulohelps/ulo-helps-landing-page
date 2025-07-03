"use client";
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const deleteReason = [
  "I found my caregiver through ULO",
  "I found my caregiver through other means",
  "I’m unsatisfied with ULO’s service",
  "I’m no longer in need of a caregiver",
  "other",
];

const DeleteAccount = () => {
  const [reason, setReason] = useState("");
  return (
    <div>
      <div className="w-full bg-[#F0F2F5] border-y border-[#D0D5DD] py-8">
        <div className="max-w-[1136px] mx-auto">
          <h2 className="text-[28px] text-[#06212C] font-semibold">
            Delete your ULO account
          </h2>
          <p className="text-base text-[#667185] font-normal md:w-1/2">
            We’re sad to see you go, but we hope you got what you came to ULO
            for. Please let us know why you’re deleting your account by
            selecting one of the options below.
          </p>
        </div>
      </div>
      <div className="max-w-[1136px] mx-auto mt-8">
        <div className="max-w-[556px] border border-[#E4E7EC] rounded-[20px] overflow-hidden">
          <div className="p-6">
            <Label className="text-sm text-[#344054] font-light mb-4 block">
              Why are you deleting your ULO account?
            </Label>
            <RadioGroup
              value={reason}
              onValueChange={(value) => setReason(value)}
              className="space-y-3"
            >
              {deleteReason.map((reason) => (
                <div className="flex items-center space-x-3">
                  <RadioGroupItem className="w-4 h-4" value={reason} id="" />
                  <Label
                    htmlFor=""
                    className="text-sm text-[#344054] font-light"
                  >
                    {reason}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          {reason === "other" && (
            <div className="px-6 mb-8">
              <Label className="text-sm text-[#344054] font-light" htmlFor="">
                Please tell us why you’re deleting your account
              </Label>
              <Input
                id=""
                type="text"
                required
                placeholder="Please tell us why you’re deleting your account"
                value={""}
                onChange={(e) => setReason(e.target.value)}
                className="mt-1 h-11 rounded-xl border-gray-300 font-normal text-sm text-[#98A2B3]"
              />
            </div>
          )}
          <div className="bg-[#F7F9FC] border-t border-[#D0D5DD] py-6 w-full flex items-center justify-center">
            <Button className="bg-[#D42620] text-white">
              Submit and delete account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
