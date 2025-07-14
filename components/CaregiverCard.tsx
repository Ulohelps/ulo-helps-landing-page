"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Bookmark, MapPin, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import Bag from "@/components/icons/bag.svg";
import VerifiedIcon from "@/components/icons/verified.svg";

import { caregiverService } from "@/lib/services/caregiverService";
import { removeUnderscores, formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Caregiver {
  id: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string;
  serviceTypes: string[];
  bio: string;
  lgaOfResidence: string;
  expectedMonthlySalary: number;
  currentlyAvailable: string;
  isBookmarked: boolean;
}

interface CaregiverCardProps {
  caregiver: Caregiver;
}

export function CaregiverCard({ caregiver }: CaregiverCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [hovered, setHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(caregiver.isBookmarked);

  const fullName = `${caregiver.firstName} ${caregiver.lastName}`;
  const isAvailable = caregiver.currentlyAvailable === "AVAILABLE";

  const handleBookmarkToggle = useCallback(async () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);

    try {
      const action = newBookmarkState
        ? caregiverService.bookmarkCaregiver
        : caregiverService.unbookmarkCaregiver;

      await action(caregiver.id);

      toast({
        title: newBookmarkState ? "Bookmark added" : "Bookmark removed",
        description: newBookmarkState
          ? "Caregiver has been bookmarked"
          : "Caregiver has been removed from bookmarks",
        variant: "success",
      });

      router.refresh();
    } catch (error) {
      console.error("Error updating bookmark:", error);
      setIsBookmarked(!newBookmarkState); // Revert on error
      toast({
        title: "Error",
        description: "Failed to update bookmark status",
        variant: "error",
      });
    }
  }, [isBookmarked, caregiver.id, router, toast]);

  const navigateToProfile = () =>
    router.push(`/find-caregiver/${caregiver.id}`);

  return (
    <article className="flex-shrink-0 w-full flex flex-col lg:flex-row border border-gray-300 rounded-3xl p-[14px] shadow-sm group transition hover:shadow-md">
      {/* Image Section */}
      <div
        className="relative w-full lg:w-[55%] h-60 md:h-auto rounded-xl overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={caregiver.profileImageUrl}
          alt={fullName}
          fill
          className="object-cover rounded-xl"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
        />

        <div
          className={`absolute bottom-6 px-4 flex items-center justify-center gap-4 transition-opacity duration-300 w-full ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button
            onClick={handleBookmarkToggle}
            variant="outline"
            size="icon"
            className={`rounded-full h-12 w-12 ${
              isBookmarked
                ? "text-amber-500 hover:text-amber-200"
                : "text-gray-700 "
            } bg-white hover:border-none hover:bg-white `}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Bookmark fill={isBookmarked ? "#F6AA3D" : "none"} />
          </Button>

          <Button
            onClick={navigateToProfile}
            className="text-gray-700 font-medium px-6 py-3 rounded-full w-full hover:bg-gray-100"
          >
            View profile
          </Button>
        </div>
      </div>

      {/* Info Section */}
      <section className="px-0 md:px-6 py-5 flex flex-col justify-between w-full lg:w-[45%] flex-1  overflow-hidden">
        <div>
          <header className="flex items-center gap-2">
            <h3 className="text-base text-gray-700 font-semibold">
              {fullName}
            </h3>
            <Image src={VerifiedIcon} alt="Verified" width={16} height={16} />
          </header>

          <div className="flex items-center gap-2 mt-2">
            <Image src={Bag} alt="Services" width={16} height={16} />
            <div className="flex items-center scrollbar-hide overflow-x-scroll gap-1">
              {caregiver.serviceTypes.map((service, idx) => (
                <span
                  key={`${service}-${idx}`}
                  className="flex text-sm text-gray-700 font-normal capitalize whitespace-nowrap"
                >
                  {removeUnderscores(service)}
                  {idx < caregiver.serviceTypes.length - 1 && ","}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-500 font-normal italic mt-3 line-clamp-3 h-10">
            {caregiver.bio}
          </p>
        </div>

        <div className="border-t border-gray-200 mt-4 pt-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} />
            <span>{caregiver.lgaOfResidence}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Wallet size={16} />
            <span>{formatCurrency(caregiver.expectedMonthlySalary)}</span>
          </div>

          {isAvailable && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center justify-center h-5 w-5 bg-green-100 rounded-full">
                <div className="h-2 w-2 bg-green-600 rounded-full animate-pulse" />
              </div>
              <span>Available</span>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
