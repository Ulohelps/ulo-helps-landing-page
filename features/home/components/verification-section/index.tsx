"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import BgCard1 from "@/public/images/verification-section/card1.svg";
import BgCard2 from "@/public/images/verification-section/image 10.svg";
import BgCard3 from "@/public/images/verification-section/card2.svg";
import BgCard4 from "@/public/images/verification-section/card3.svg";
import BgCard5 from "@/public/images/verification-section/card4.svg";

import {
  CardICon,
  ShieldICon,
  VerifyICon,
  UserSearchICon,
  LocationBlackICon,
} from "../../../../components/icons";

const bgCards = [BgCard1, BgCard2, BgCard3, BgCard4, BgCard5];

const VerficationSection = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) =>
        prevIndex === bgCards.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-[1136px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 py-20 px-4">
      {/* Image Slider */}
      <div className="relative w-full md:w-[556px] h-[500px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={bgCards[currentBgIndex]}
              alt="User verification card"
              fill
              style={{ objectFit: "contain" }}
              quality={100}
              priority
              className="select-none"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#E9F6FC80] p-6 rounded-[24px] border border-[#B4E1F3] w-full md:w-1/2 shadow-sm"
      >
        <h2 className="text-[32px] text-[#344054] font-semibold mb-4 leading-snug">
          We're not just another platform. We're a movement for{" "}
          <span className="text-[#1DA5DB]">dignified care</span>.
        </h2>

        <div className="space-y-4 mt-6">
          {[
            {
              icon: <VerifyICon />,
              text: "No easy way to verify or trust caregivers",
            },
            {
              icon: <UserSearchICon />,
              text: "Transparent profiles with experience, languages, and skills.",
            },
            {
              icon: <CardICon />,
              text: "One price, unlimited connections.",
            },
            {
              icon: <LocationBlackICon />,
              text: "Location-based smart matching.",
            },
            {
              icon: <ShieldICon />,
              text: "Safe, agent-free hiring.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex items-center gap-5"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-[#B4E1F3] p-2 rounded-[12px] flex items-center justify-center transition-transform"
              >
                {item.icon}
              </motion.div>
              <p className="text-base text-[#475367] font-normal">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default VerficationSection;
