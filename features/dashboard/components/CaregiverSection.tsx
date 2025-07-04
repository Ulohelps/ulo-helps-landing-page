"use client";

import { CaregiverCard, Caregiver } from "../../../components/CaregiverCard";
import ArrowLeft from "@/components/icons/arrowleft.svg";
import ArrowRight from "@/components/icons/arrowright.svg";
import EmptyStateIcon from "@/components/icons/EmptyStateICon";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CaregiverSectionProps {
  title: string;
  caregivers: Caregiver[] | null;
  showAllLink?: string;
  isLoading?: boolean;
}

export function CaregiverSection({
  title,
  caregivers,
  showAllLink,
  isLoading = false,
}: CaregiverSectionProps) {
  const ITEMS_PER_PAGE = 2;
  const visibleCaregivers = caregivers?.slice(0, 10); // Limit to 10
  const totalPages = Math.ceil(
    (visibleCaregivers?.length ?? 0) / ITEMS_PER_PAGE
  );

  const [currentPage, setCurrentPage] = useState(0);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentCaregivers = visibleCaregivers?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePrev = () =>
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));

  const handleNext = () =>
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));

  const getColorClass = () => {
    switch (title) {
      case "Nannies":
        return "text-[#00ABA5]";
      case "Drivers":
        return "text-[#E74A8A]";
      case "Housekeepers":
        return "text-[#AB5BA6]";
      case "Chefs":
        return "text-[#F1473C]";
      default:
        return "text-[#344054]";
    }
  };

  return (
    <section className="my-10 space-y-4 border border-[#E4E7EC] rounded-[24px]">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#E4E7EC] p-3 md:p-6">
        <h2 className="text-base md:text-xl text-[#344054] font-semibold">
          Find <span className={getColorClass()}>{title}</span> on ULO
        </h2>

        {showAllLink && (
          <Link
            href={`/find-caregiver?serviceType=${title.toLocaleUpperCase()}`}
            className="text-[#344054] border text-xs border-[#D0D5DD] px-3 py-1 whitespace-nowrap md:px-6 md:py-3 rounded-[80px] hover:underline md:text-base font-semibold lowercase"
          >
            See all {title} →
          </Link>
        )}
      </div>

      {/* Caregiver Cards or Skeleton or Empty */}
      <div className="px-3 md:px-6 py-5">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(ITEMS_PER_PAGE)].map((_, idx) => (
              <div
                key={idx}
                className="h-[220px] rounded-[16px] bg-gray-200 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (visibleCaregivers?.length ?? 0) > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentCaregivers?.map((caregiver, idx) => (
                <CaregiverCard caregiver={caregiver} key={idx} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-6 pt-6 border-t border-[#D0D5DD]">
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
            )}
          </>
        ) : (
          <div className="w-full text-center py-12 flex flex-col items-center justify-center">
            <EmptyStateIcon />
            <p className="text-gray-500 text-sm md:text-base mt-2">
              No {title.toLowerCase()} available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
