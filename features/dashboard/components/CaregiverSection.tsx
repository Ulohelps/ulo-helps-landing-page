"use client";

import { CaregiverCard, Caregiver } from "./CaregiverCard";
import ArrowLeft from "@/components/icons/arrowleft.svg";
import ArrowRight from "@/components/icons/arrowright.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function CaregiverSection({
  title,
  caregivers,
  showAllLink,
}: {
  title: string;
  caregivers: Caregiver[];
  showAllLink?: string;
}) {
  const ITEMS_PER_PAGE = 2;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(caregivers.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentCaregivers = caregivers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  return (
    <section className="my-10 space-y-4 border border-[#E4E7EC] rounded-[24px]">
      <div className="flex justify-between items-center border-b border-[#E4E7EC] p-3 md:p-6">
        <h2 className="text-base md:text-xl text-[#344054] font-semibold">
          Find{" "}
          <span
            className={`${title === "Nannies" && "text-[#00ABA5]"} ${
              title === "Drivers" && "text-[#E74A8A]"
            } ${title === "Housekeepers" && "text-[#AB5BA6]"} ${
              title === "Chefs" && "text-[#F1473C]"
            }`}
          >
            {title}
          </span>{" "}
          on ULO
        </h2>
        {showAllLink && (
          <Link
            href={showAllLink}
            className="text-[#344054] border text-xs border-[#D0D5DD] px-3 py-1 whitespace-nowrap md:px-6 md:py-3 rounded-[80px] hover:underline md:text-base font-semibold lowercase"
          >
            See all {title} →
          </Link>
        )}
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 px-3 py-2 md:px-6 md:py-5">
        {currentCaregivers.map((caregiver, idx) => (
          <CaregiverCard caregiver={caregiver} key={idx} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 px-3 py-2 md:px-6 md:py-5 border-t border-[#D0D5DD]">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="flex items-center justify-center p-[14px] border border-[#D0D5DD] h-12 w-12 rounded-full disabled:opacity-50"
        >
          <Image src={ArrowLeft} alt="Previous" />
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <div
              key={idx}
              className={`w-[6px] h-[6px] rounded-full ${
                idx === currentPage ? "bg-[#1DA5DB]" : "bg-[#98A2B3]"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className="flex items-center justify-center p-[14px] border border-[#D0D5DD] h-12 w-12 rounded-full disabled:opacity-50"
        >
          <Image src={ArrowRight} alt="Next" />
        </button>
      </div>
    </section>
  );
}
