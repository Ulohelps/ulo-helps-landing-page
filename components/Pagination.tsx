import { useState } from "react";
import Image from "next/image";
import ArrowLeft from "@/components/icons/arrowleft.svg";
import ArrowRight from "@/components/icons/arrowright.svg"; 

 const Pagination=({totalitem}:{totalitem:number}) => {
        const itemsPerPage = 1;
        const [currentPage, setCurrentPage] = useState(1);
        const totalPages = Math.ceil(totalitem / itemsPerPage);

        const handlePrev = () => {
          setCurrentPage((prev) => Math.max(prev - 1, 1));
        };

        const handleNext = () => {
          setCurrentPage((prev) => Math.min(prev + 1, totalPages));
        };

        // Only show pagination if more than one page
        if (totalPages <= 1) return null;

        return (
          <div className="flex items-center justify-center gap-6 px-6 py-5 border-t border-[#D0D5DD]">
            <button
              className="flex items-center justify-center p-[14px] border border-[#D0D5DD] h-12 w-12 rounded-full disabled:opacity-50"
              onClick={handlePrev}
              disabled={currentPage === 1}
              aria-label="Previous page"
              type="button"
            >
              <Image src={ArrowLeft} alt="" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-[6px] h-[6px] rounded-full ${
                    idx + 1 === currentPage ? "bg-[#1DA5DB]" : "bg-[#98A2B3]"
                  }`}
                />
              ))}
            </div>
            <button
              className="flex items-center justify-center p-[14px] border border-[#D0D5DD] h-12 w-12 rounded-full disabled:opacity-50"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              type="button"
            >
              <Image src={ArrowRight} alt="" />
            </button>
          </div>
        );
}
export default Pagination;