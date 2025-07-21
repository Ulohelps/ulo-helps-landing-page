"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ChevronDown } from "lucide-react";
import { useCaregiverStore } from "@/lib/stores/caregiver-store";
import { useState } from "react";

const lagosLGA = [
  "Agege",
  "Ajeromi-Ifelodun",
  "Alimosho",
  "Amuwo-Odofin",
  "Apapa",
  "Badagry",
  "Epe",
  "Eti Osa",
  "Ibeju-Lekki",
  "Ifako-Ijaiye",
  "Ikeja",
  "Ikorodu",
  "Kosofe",
  "Lagos Island",
  "Lagos Mainland",
  "Mushin",
  "Ojo",
  "Oshodi-Isolo",
  "Shomolu",
];

const serviceTypes = [
  { id: "CHILDCARE_NANNY", label: "Childcare (Nanny)" },
  { id: "ELDER_CARE", label: "Elder care" },
  { id: "CLEANER", label: "Cleaner" },
  { id: "COOK", label: "Cook" },
  { id: "CHEF", label: "Chef" },
  { id: "DRIVER", label: "Driver" },
  { id: "HOUSEKEEPER", label: "Housekeeper" },
  { id: "LAUNDRY_WASHER", label: "Laundry Man/Washer" },
];

interface CaregiverFilterBarProps {
  onSearch: (params: { search?: string }) => void;
  initialFilters?: {
    search?: string;
  };
}

export function CaregiverFilterBar({
  onSearch,
  initialFilters = {},
}: CaregiverFilterBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialFilters.search || "");

  const handleSearch = () => {
    const searchParams = {
      search: searchTerm.trim() || undefined,
    };
    onSearch(searchParams);
  };

  return (
    <div className="w-full max-w-[1136px] mx-auto bg-white rounded-[16px] mt-8 flex flex-col md:flex-row md:items-center md:h-[72px] overflow-hidden md:gap-2">
      {/* Search input */}
      <Input
        placeholder="Search by keyword"
        className="py-3 text-base text-[#667185] font-normal px-4 md:px-8 border-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      <Button
        onClick={handleSearch}
        className="flex items-center justify-center flex-row-reverse md:flex-row gap-2 w-full md:w-auto py-3 h-full text-base text-[#1D2739] font-semibold rounded-t-none rounded-b-[12px] md:rounded-[12px] md:rounded-l-none md:rounded-r-[16px]"
      >
        <Search size={18} />
        Find caregivers
      </Button>
    </div>
  );
}
