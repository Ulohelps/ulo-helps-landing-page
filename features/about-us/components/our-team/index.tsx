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
    <section className="max-w-[1136px] mx-auto py-24 px-4">
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
