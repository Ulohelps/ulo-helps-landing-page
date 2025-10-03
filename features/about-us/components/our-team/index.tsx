import React from "react";
import Image from "next/image";

import Amake from "@/public/about-us/Amaka.jpg";
import Dinma from "@/public/about-us/Chidinma Onyemelukwe.jpg";
import Chi from "@/public/about-us/Chinyere Usang.jpg";
import Goodness from "@/public/about-us/goodness.jpg";

const teamMembers = [
  { name: "Amaka Igwe", role: "Founder/CEO", image: Amake },
  { name: "Chidinma Onyemelukwe", role: "Product Manager", image: Dinma },
  { name: "Goodness Olaoluwa", role: "Engineering Lead", image: Goodness },
  { name: "Chinyere Usang", role: "ARM", image: Chi },
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
