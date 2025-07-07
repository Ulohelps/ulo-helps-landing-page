import ArrowL from "@/components/icons/ArrowL";
import BagIcon from "@/components/icons/BagIcon";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const FeedbackCard = ({ name }: { name: string }) => {
  const router = useRouter();
  return (
    <div className="border border-[#E4E7EC] rounded-[24px] p-6 flex items-center gap-4 w-full md:w-[65%] mb-6">
      <div className="bg-[#E7F6EC] p-5 rounded-full flex items-center justify-center">
        <BagIcon />
      </div>
      <div>
        <h4 className="text-base text-[#344054] font-semibold">
          Did you hire {name}?
        </h4>
        <p className="text-sm text-[#667185] mt-2">
          We take every connection on ULO very seriously and would like to know
          if this connection led to a successful hire. Your subscription is not
          affected by this feedback.
        </p>
        <Button
          variant="outline"
          className="font-semibold mt-1"
          onClick={() => router.push("/caregiver-feedback")}
        >
          Give post-connection feedback <ArrowL />
        </Button>
      </div>
    </div>
  );
};

export default FeedbackCard;
