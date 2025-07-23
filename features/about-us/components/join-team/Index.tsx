import React from "react";
import TeamPic from "@/public/images/jointeam.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const JoinTeam = () => {
  return (
    <div className="max-w-[1136px] mx-auto py-[96px]">
      <div className="p-6 bg-[#E9F6FC80] border border-[#B4E1F3] rounded-[24px] flex items-center justify-between gap-10">
        <Image src={TeamPic} alt="" className="rounded-[24px] w-1/2" />
        <div className="w-1/2 space-y-6">
          <h4 className="text-[2x] text-[#06212C] font-semibold">
            Join our team
          </h4>
          <p className="text-base text-[#06212C] font-normal">
            Looking for your chance to make a difference in how domestic
            services are employed and provided? Click the button below to see
            our list of open roles.{" "}
          </p>
          <p className="text-base text-[#06212C] font-normal">
            Don’t see anything that fits you? Still send us your CV at
            hr@ulohelps.com and we’ll get back to you when we find a role that
            fits you.
          </p>
          <Button variant="outline">See open roles</Button>
        </div>
      </div>
    </div>
  );
};

export default JoinTeam;
