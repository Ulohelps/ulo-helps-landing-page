import { CaregiverCard, Caregiver } from "./CaregiverCard";
import ArrowLeft from "@/components/icons/arrowleft.svg";
import ArrowRight from "@/components/icons/arrowright.svg";
import Image from "next/image";
import Link from "next/link";

export function CaregiverSection({
  title,
  caregivers,
  showAllLink,
}: {
  title: string;
  caregivers: Caregiver[];
  showAllLink?: string;
}) {
  return (
    <section className="my-10 space-y-4 border border-[#E4E7EC] rounded-[24px]">
      <div className="flex justify-between items-center border-b border-[#E4E7EC] p-6">
        <h2 className="text-xl text-[#344054] font-semibold">
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
            className="text-[#344054] border border-[#D0D5DD] px-6 py-3 rounded-[80px] hover:underline text-base font-semibold lowercase"
          >
            See all {title} →
          </Link>
        )}
      </div>
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        {caregivers.map((caregiver, idx) => (
          <CaregiverCard caregiver={caregiver} key={idx} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-6 px-6 py-5 border-t border-[#D0D5DD]">
        <div className=" flex items-center justify-center p-[14px] border border-[#D0D5DD] h-12 w-12 rounded-full">
          <Image src={ArrowLeft} alt="" />
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-[#1DA5DB] w-[6px] h-[6px] rounded-full" />
          <div className="bg-[#98A2B3] w-[6px] h-[6px] rounded-full" />
          <div className="bg-[#98A2B3] w-[6px] h-[6px] rounded-full" />
          <div className="bg-[#98A2B3] w-[6px] h-[6px] rounded-full" />
        </div>
        <div className=" flex items-center justify-center p-[14px] border border-[#D0D5DD] h-12 w-12 rounded-full">
          <Image src={ArrowRight} alt="" />
        </div>
      </div>
    </section>
  );
}
