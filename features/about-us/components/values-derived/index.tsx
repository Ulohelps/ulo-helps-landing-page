import React from "react";
import { StarICon } from "@/components/icons";
const ValuesDerived = () => {
  return (
    <div className="bg-[#E9F6FC] py-[96px]">
      <div className="max-w-[1136px] mx-auto">
        <div className="max-w-[556px]">
          <h2 className="text-[32px] text-[#344054] font-semibold">
            Our values drive and define us
          </h2>
          <p className="text-lg text-[#344054] font-normal">
            We lead with honesty. From our matching process to our pricing, we
            are upfront and clear, so everyone can make informed, confident
            decisions.
          </p>
        </div>
        <div className="mt-8 space-y-14">
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center p-3 h-[48px] w-[48px] bg-[#B4E1F3] border border-[#1DA5DB] rounded-[12px]">
                <StarICon />
              </div>
              <p className="text-xl text-[#344054] font-bold">Dignity</p>
            </div>
            <p className="text-base text-[#475367] font-normal w-[480px]">
              We believe that all work especially care work deserves respect. We
              treat both caregivers and care seekers with the humanity and
              dignity they deserve.
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center p-3 h-[48px] w-[48px] bg-[#B4E1F3] border border-[#1DA5DB] rounded-[12px]">
                <StarICon />
              </div>
              <p className="text-xl text-[#344054] font-bold">Transparency</p>
            </div>
            <p className="text-base text-[#475367] font-normal w-[480px]">
              We lead with honesty. From our matching process to our pricing, we
              are upfront and clear, so everyone can make informed, confident
              decisions.
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center p-3 h-[48px] w-[48px] bg-[#B4E1F3] border border-[#1DA5DB] rounded-[12px]">
                <StarICon />
              </div>
              <p className="text-xl text-[#344054] font-bold">Care</p>
            </div>
            <p className="text-base text-[#475367] font-normal w-[480px]">
              We lead with honesty. From our matching process to our pricing, we
              are upfront and clear, so everyone can make informed, confident
              decisions.
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center p-3 h-[48px] w-[48px] bg-[#B4E1F3] border border-[#1DA5DB] rounded-[12px]">
                <StarICon />
              </div>
              <p className="text-xl text-[#344054] font-bold">Empowerment</p>
            </div>
            <p className="text-base text-[#475367] font-normal w-[480px]">
              We open doors for caregivers to access real work opportunities,
              enabling them to earn and grow. For care seekers, we offer the
              confidence and control to choose help that truly fits creating a
              sense of empowerment on both sides of the match.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuesDerived;
