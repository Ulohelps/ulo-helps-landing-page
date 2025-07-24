import React from "react";
import TeamPic from "@/public/images/jointeam.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const JoinTeam = () => {
  return (
    <section className="max-w-[1136px] mx-auto py-24 px-4">
      <div className="p-6 bg-[#E9F6FC80] border border-[#B4E1F3] rounded-[24px] flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2">
          <Image
            src={TeamPic}
            alt="Join our team illustration"
            className="rounded-[24px] w-full h-auto object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <h4 className="text-2xl text-[#06212C] font-semibold">
            Join our team
          </h4>
          <p className="text-base text-[#06212C] font-normal">
            Looking for your chance to make a difference in how domestic
            services are employed and provided? Click the button below to see
            our list of open roles.
          </p>
          <p className="text-base text-[#06212C] font-normal">
            Don’t see anything that fits you? Still send us your CV at{" "}
            <a
              href="mailto:hr@ulohelps.com"
              className="underline text-[#0077B6] hover:text-[#005f8c]"
            >
              hr@ulohelps.com
            </a>{" "}
            and we’ll get back to you when we find a role that fits you.
          </p>
          <Button variant="outline">See open roles</Button>
        </div>
      </div>
    </section>
  );
};

export default JoinTeam;
