"use client";

import { CaregiverCard, Caregiver } from "../../../components/CaregiverCard";
import ArrowLeft from "@/components/icons/arrowleft.svg";
import Image from "next/image";
import ArrowRight from "@/components/icons/arrowright.svg";
import Link from "next/link";
import { useRef, useState } from "react";

export function CaregiverSection({
  title,
  caregivers,
  showAllLink,
}: {
  title: string;
  caregivers: Caregiver[];
  showAllLink?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
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
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="my-10 space-y-4 border border-[#E4E7EC] rounded-[24px]">
      {/* Header */}
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
            href={"/find-caregiver"}
            className="text-[#344054] border text-xs border-[#D0D5DD] px-3 py-1 whitespace-nowrap md:px-6 md:py-3 rounded-[80px] hover:underline md:text-base font-semibold lowercase"
          >
            See all {title} →
          </Link>
        )}
      </div>

      {/* Scrollable Cards */}
      <div className="relative">
        <div className="overflow-x-auto md:overflow-auto px-3 md:px-6 py-5 scrollbar-hide">
          <div
            ref={scrollRef}
            className="flex gap-4 md:grid md:grid-cols-2 w-full min-w-[300px] md:min-w-0"
          >
            {/* grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1136px] mx-auto px-4 md:px-8 mt-8 */}
            {caregivers.map((caregiver, idx) => (
              <CaregiverCard caregiver={caregiver} key={idx} />
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-6 px-6 py-5 border-t border-[#D0D5DD]">
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
      </div>
    </section>
  );
}
