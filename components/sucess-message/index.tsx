"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import React from "react";

interface SuccessMessageProps {
  heading?: string;
  message?: string;
  buttonLabel?: string | React.ReactNode;
  redirectTo?: string;
  icon?: React.ReactNode;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  heading = "successful",
  message = `your action was completed successfully`,
  buttonLabel = "Done",
  redirectTo = "/dashboard",
  icon = (
    <CheckIcon className="h-14 w-14 text-white bg-[#099137] rounded-full mx-auto p-3 mb-3" />
  ),
}) => {
  const router = useRouter();

  const handleDone = () => {
    router.push(redirectTo);
  };

  return (
    <div className="container mx-auto my-12 max-w-[750px] w-full text-center bg-white border border-[#E4E7EC] rounded-[20px]">
      <div className="mt-8">{icon}</div>

      <h1 className="text-xl sm:text-2xl text-[#344054] font-bold mb-4  px-4 sm:px-6">
        {heading}
      </h1>

      <p className="text-base text-[#344054] font-normal leading-relaxed tracking-normal mb-6  px-4 sm:px-6">
        {message}
      </p>
      <div className=" px-4 sm:px-6 bg-[#F7F9FC] border border-[#D0D5DD] py-8 rounded-b-[20px]">
        {" "}
        <Button
          type="button"
          onClick={handleDone}
          variant="outline"
          className=" w-full max-w-[200px] text-[#344054]"
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};

export default SuccessMessage;
