"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import BgCard1 from "@/public/Comp 2_2.gif";

import {
  CardICon,
  ShieldICon,
  VerifyICon,
  UserSearchICon,
  LocationBlackICon,
} from "../../../../components/icons";

const VerficationSection = () => {
  return (
    <section className="max-w-[1136px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 py-20 px-4">
      <div className="relative w-full md:w-[556px] h-[500px] overflow-hidden">
        <Image
          src={BgCard1}
          alt="User verification card"
          fill
          style={{ objectFit: "contain" }}
          quality={100}
          priority
          className="select-none"
        />
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
              text: "Verified caregivers with ID documents and background checks.",
            },
            {
              icon: <UserSearchICon />,
              text: "Transparent profiles.",
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
              text: "Safe hiring.",
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
