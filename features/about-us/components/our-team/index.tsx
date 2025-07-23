import React from "react";
import Image from "next/image";
import Debo from "@/public/images/debo.png";
import Josh from "@/public/images/josh.png";
import Hana from "@/public/images/hana.png";
import Naomi from "@/public/images/naomi.png";
import Stev from "@/public/images/stev.png";
import Dan from "@/public/images/dan.png";
import Mag from "@/public/images/mag.png";
import Andy from "@/public/images/andy.png";

const OurTeam = () => {
  return (
    <div className="max-w-[1136px] mx-auto py-[96px]">
      <h2 className="text-[32px] text-[#344054] text-center font-semibold">
        The team behind the dream
      </h2>
      <div className="grid grid-cols-4 gap-10 mt-8">
        <div className="flex flex-col items-center">
          <Image
            src={Debo}
            alt=""
            width={1000}
            height={1000}
            className="w-[200px] h-[220px] rounded-[24px]"
          />
          <p className="text-lg text-[#06212C] text-center font-semibold mt-5">
            Deborah Opuogbo
          </p>
          <p className="text-base text-[#06212C] text-center font-normal mt-3">
            Creative Director
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={Hana}
            alt=""
            width={1000}
            height={1000}
            className="w-[200px] h-[220px] rounded-[24px]"
          />
          <p className="text-lg text-[#06212C] text-center font-semibold mt-5">
            Hannah Maduabuchi
          </p>
          <p className="text-base text-[#06212C] text-center font-normal mt-3">
            Marketing Lead
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={Josh}
            alt=""
            width={1000}
            height={1000}
            className="w-[200px] h-[220px] rounded-[24px]"
          />
          <p className="text-lg text-[#06212C] text-center font-semibold mt-5">
            Joshua Aluko
          </p>
          <p className="text-base text-[#06212C] text-center font-normal mt-3">
            Opera Conductor
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={Dan}
            alt=""
            width={1000}
            height={1000}
            className="w-[200px] h-[220px] rounded-[24px]"
          />
          <p className="text-lg text-[#06212C] text-center font-semibold mt-5">
            Daniel Wakili
          </p>
          <p className="text-base text-[#06212C] text-center font-normal mt-3">
            Finance Analyst
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={Naomi}
            alt=""
            width={1000}
            height={1000}
            className="w-[200px] h-[220px] rounded-[24px]"
          />
          <p className="text-lg text-[#06212C] text-center font-semibold mt-5">
            Naomi Usman
          </p>
          <p className="text-base text-[#06212C] text-center font-normal mt-3">
            Operations Lead
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={Stev}
            alt=""
            width={1000}
            height={1000}
            className="w-[200px] h-[220px] rounded-[24px]"
          />
          <p className="text-lg text-[#06212C] text-center font-semibold mt-5">
            Stephen Adebayo
          </p>
          <p className="text-base text-[#06212C] text-center font-normal mt-3">
            Graphic Designer
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={Andy}
            alt=""
            width={1000}
            height={1000}
            className="w-[200px] h-[220px] rounded-[24px]"
          />
          <p className="text-lg text-[#06212C] text-center font-semibold mt-5">
            Andrew Ezike
          </p>
          <p className="text-base text-[#06212C] text-center font-normal mt-3">
            CTO
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={Mag}
            alt=""
            width={1000}
            height={1000}
            className="w-[200px] h-[220px] rounded-[24px]"
          />
          <p className="text-lg text-[#06212C] text-center font-semibold mt-5">
            Margaret Obubra
          </p>
          <p className="text-base text-[#06212C] text-center font-normal mt-3">
            Head of Legal
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
