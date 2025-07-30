"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const JoinUs = () => {
  const router = useRouter();
  return (
    <div className="bg-[#1DA5DB] px-4 py-12 md:py-20">
      <div className="max-w-[1136px] mx-auto">
        <h3 className="text-2xl text-center font-semibold text-white">
          Ready to take your career into your own hands?
        </h3>
        <p className="text-base text-center text-[#F0F2F5] font-normal mt-3 max-w-[816px] mx-auto">
          At ULO, we believe every caregiver deserves more than just work.
          Whether you're a housekeeper, cook, cleaner, driver, or postnatal
          caregiver, you deserve choice, respect, and the freedom to grow on
          your own terms. Join a platform that sees your worth and connects you
          to care seekers who do too. 
        </p>
        <div className="flex justify-center mt-8">
          <Button
            className="shadow-md"
            onClick={() =>
              router.push("https://caregivers.ulohelps.com/auth/login")
            }
          >
            Join as a caregiver
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
