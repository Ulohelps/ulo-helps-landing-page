import React from "react";
import Image from "next/image";

import Debo from "@/public/about-us/team-image-01.png";
import Josh from "@/public/about-us/team-image-02.png";
import Hana from "@/public/about-us/team-image-03.png";
import Naomi from "@/public/about-us/team-image-04.png";
import Stev from "@/public/about-us/team-image-05.png";
import Dan from "@/public/about-us/team-image-06.png";
import Mag from "@/public/about-us/team-image-07.png";
import Andy from "@/public/about-us/team-image-08.png";

const teamMembers = [
  { name: "Amaka Igwe", role: "Founder/CEO", image: Debo },
  { name: "Lawrence Martins", role: "Marketing Lead", image: Hana },
  { name: "Chidinma ", role: "Product Manager", image: Josh },
  { name: "Goodness Olaoluwa", role: "Engineering Lead", image: Dan },
  { name: "Chinyere", role: "ARM", image: Naomi },
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
