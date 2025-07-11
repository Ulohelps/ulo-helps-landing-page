"use client";

import { useEffect, useState } from "react";
import Nannies from "@/public/images/sign-up/lawrence-crayton-KXOaNSU63NE-unsplash 1.png";
import Cleaners from "@/public/images/sign-up/8b03a4c7fdc0076568cdaf1dd88d9d5aa4411732.jpg";
import Driver from "@/public/images/sign-up/joshwa-figaroa-iEa4l4DpPYY-unsplash 1.png";
import Chef from "@/public/images/sign-up/emediong-umoh-fY9ZV9-475o-unsplash 1.png";
import Image from "next/image";

const images = [
  { image: Nannies, description: "nannies" },
  { image: Cleaners, description: "cleaners" },
  { image: Driver, description: "drivers" },
  { image: Chef, description: "chefs" },
];

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getTextColor = (desc: string) => {
    switch (desc) {
      case "nannies":
        return "text-[#E74A8A]";
      case "cleaners":
        return "text-[#00ABA5]";
      case "drivers":
        return "text-[#8F76B8]";
      case "chefs":
        return "text-[#F1473C]";
      default:
        return "text-white";
    }
  };

  return (
    <div className="bg-[#B4E1F3] hidden md:block h-[740px] w-full md:w-[3/5] rounded-[24px] relative overflow-hidden">
      <Image
        src={images[currentIndex].image}
        alt="Slideshow"
        fill
        priority
        className="absolute inset-0 w-full h-full object-cover rounded-[24px] transition-opacity duration-500"
      />
      <p className="text-[28px] font-semibold text-white absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center">
        Find the best{" "}
        <span className={getTextColor(images[currentIndex].description)}>
          {images[currentIndex].description}
        </span>{" "}
        on ULO
      </p>
    </div>
  );
}
