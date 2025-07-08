"use client";
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { subscriptionService } from "@/lib/services/subscriptionService";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

const deleteReason = [
  "I found my caregiver through ULO",
  "I found my caregiver through other means",
  "I’m unsatisfied with ULO’s service",
  "I’m no longer in need of a caregiver",
  "other",
];

const CancelSubscription = () => {
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  const handleCancelSubscription = async () => {
    setIsLoading(true);
    try {
      await subscriptionService.cancelSubscription(reason);

      toast({
        title: "Subscription cancelled",
        description: "Your subscription has been successfully cancelled.",
        variant: "success",
      });
      setIsLoading(false);
      router.push("/subscriptions");
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "There was an error cancelling your subscription.",
        variant: "error",
      });
      console.error("Error cancelling subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="w-full bg-[#F0F2F5] border-y border-[#D0D5DD] py-8">
        <div className="max-w-[1136px] mx-auto">
          <h2 className="text-[28px] text-[#06212C] font-semibold">
            Cancel your ULO subscription
          </h2>
          <p className="text-base text-[#667185] font-normal md:w-1/2">
            We’re sad to see you go, but we hope you got what you came to ULO
            for. Please let us know why you’re cancelling your subscription by
            selecting one of the options below.
          </p>
        </div>
      </div>
      <div className="max-w-[1136px] mx-auto mt-8">
        <div className="max-w-[556px] border border-[#E4E7EC] rounded-[20px] overflow-hidden">
          <div className="p-6">
            <Label className="text-sm text-[#344054] font-light mb-4 block">
              Why are you cancelling your ULO subscription?
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
                Please tell us why you’re cancelling your subscription
              </Label>
              <Input
                id=""
                type="text"
                required
                placeholder="Please tell us why you’re cancelling your subscription"
                value={""}
                onChange={(e) => setReason(e.target.value)}
                className="mt-1 h-11 rounded-xl border-gray-300 font-normal text-sm text-[#98A2B3]"
              />
            </div>
          )}
          <div className="bg-[#F7F9FC] border-t border-[#D0D5DD] py-6 w-full flex items-center justify-center">
            <Button className="" onClick={handleCancelSubscription}>
              {isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                "Submit and cancel subscription"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelSubscription;
