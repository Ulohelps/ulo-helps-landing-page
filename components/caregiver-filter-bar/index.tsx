"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCaregiverStore } from "@/lib/stores/caregiver-store";
import { useState, useEffect } from "react";

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

export function CaregiverFilterBar() {
  const router = useRouter();
  const { searchCaregivers } = useCaregiverStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const buildQueryParams = () => {
    const query: Record<string, string> = {};

    if (searchTerm.trim()) query.search = searchTerm.trim();
    if (selectedServices.length > 0)
      query.serviceTypes = selectedServices.join(",");
    if (selectedLocation !== "all") query.location = selectedLocation;

    return new URLSearchParams(query).toString();
  };

  const handleSearch = async () => {
    const params = {
      page: 1,
      limit: 10,
      search: searchTerm.trim(),
      serviceTypes: selectedServices.length > 0 ? selectedServices : undefined,
      location: selectedLocation !== "all" ? selectedLocation : undefined,
    };

    const queryString = buildQueryParams();
    if (queryString) {
      router.push(`/find-caregiver?${queryString}`);
    } else {
      // If no filters are applied, redirect to the main search page
      router.push("/find-caregiver");
    }
  };

  return (
    <div className="w-full max-w-[1136px] mx-auto bg-white border border-[#D0D5DD] rounded-[16px] mt-8 flex flex-col md:flex-row md:items-center md:h-[72px] overflow-hidden md:gap-2">
      {/* Search input */}
      <Input
        placeholder="Search by keyword"
        className="py-3 text-base text-[#667185] font-normal px-4 md:px-8 border md:border-0 border-[#D0D5DD] rounded-md md:rounded-none md:border-r"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      {/* Multi-select service types */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-between w-full md:w-auto px-4 md:px-8 py-3 text-base text-[#667185] font-normal border md:border-0 border-[#D0D5DD] rounded-md md:rounded-none md:border-r h-full"
          >
            {selectedServices.length > 0
              ? `${selectedServices.length} selected`
              : "Service: All"}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2 bg-white rounded-[20px] border-none shadow-md">
          {serviceTypes.map((service) => (
            <label
              key={service.id}
              className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-50 cursor-pointer"
            >
              <Checkbox
                checked={selectedServices.includes(service.id)}
                onCheckedChange={() => toggleService(service.id)}
              />
              <span className="text-sm text-gray-800">{service.label}</span>
            </label>
          ))}
        </PopoverContent>
      </Popover>

      {/* Location select */}
      <select
        className="px-4 md:px-8 py-3 text-base text-[#667185] font-normal border md:border-0 border-[#D0D5DD] rounded-md md:rounded-none h-full"
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        <option value="all">Location: All</option>
        {lagosLGA.map((lga) => (
          <option key={lga} value={lga}>
            {lga}
          </option>
        ))}
      </select>

      {/* Search button */}
      <Button
        onClick={handleSearch}
        className="flex items-center justify-center gap-2 w-full md:w-auto py-3 h-full text-base text-[#1D2739] font-semibold rounded-t-none rounded-b-[12px] md:rounded-[12px] md:rounded-l-none md:rounded-r-[16px]"
      >
        <Search size={18} />
        Find caregivers
      </Button>
    </div>
  );
}
