import React from "react";
import Image from "next/image";

import Debo from "@/public/images/theresa-ude-ute-FnZeIo8-unsplash.svg";
import Josh from "@/public/images/bave-pictures-fl7bASYZgXo-unsplash.svg";
import Hana from "@/public/images/jeff-kweba-kae-dlerBcw-unsplash.svg";
import Naomi from "@/public/images/oluwaferanmi-caleb-Q1QRTSeZIxI-unsplash.svg";
import Stev from "@/public/images/kingsley-osei-abrah-A8tMVOKvCxg-unsplash.svg";
import Dan from "@/public/images/chris-ejike-tj_rCakvxE8-unsplash.svg";
import Mag from "@/public/images/bave-pictures-LZf3AcfG7D4-unsplash.svg";
import Andy from "@/public/images/chukselite-HunNgg3kl1w-unsplash.svg";

const teamMembers = [
  { name: "Deborah Opuogbo", role: "Creative Director", image: Debo },
  { name: "Hannah Maduabuchi", role: "Marketing Lead", image: Hana },
  { name: "Joshua Aluko", role: "Opera Conductor", image: Josh },
  { name: "Daniel Wakili", role: "Finance Analyst", image: Dan },
  { name: "Naomi Usman", role: "Operations Lead", image: Naomi },
  { name: "Stephen Adebayo", role: "Graphic Designer", image: Stev },
  { name: "Andrew Ezike", role: "CTO", image: Andy },
  { name: "Margaret Obubra", role: "Head of Legal", image: Mag },
];

const OurTeam = () => {
  return (
    <section className="max-w-[1136px] mx-auto py-32 px-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#344054]">
        The team behind the dream
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-12">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <Image
              src={member.image}
              alt={member.name}
              width={1000}
              height={1000}
              className="w-[200px] h-[220px] object-cover rounded-[24px]"
            />
            <p className="mt-5 text-lg font-semibold text-center text-[#06212C]">
              {member.name}
            </p>
            <p className="mt-3 text-base font-normal text-center text-[#06212C]">
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
