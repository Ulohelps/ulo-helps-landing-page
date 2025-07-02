"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
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
  const { searchCaregivers, setSearchParams } = useCaregiverStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  const handleSearch = async () => {
    const params = {
      page: 1,
      limit: 10,
      search: searchTerm,
      serviceTypes: ["CLEANER"],
      location: selectedLocation !== "all" ? selectedLocation : undefined,
    };

    try {
      setSearchParams(params);
      await searchCaregivers(params);

      router.push("/find-caregiver");
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  // Optional: Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        setSearchParams({
          search: searchTerm,
          page: 1,
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, setSearchParams]);

  return (
    <div className="w-full max-w-[1136px] mx-auto bg-white border border-[#D0D5DD] rounded-[16px] mt-8 flex flex-col md:flex-row md:items-center md:h-[72px] overflow-hidden md:gap-2">
      <Input
        placeholder="Search by keyword"
        className="py-3 text-base text-[#667185] font-normal px-4 md:px-8 border md:border-0 border-[#D0D5DD] rounded-md md:rounded-none md:border-r"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      <Select
        value={selectedService}
        onValueChange={(value) => setSelectedService(value)}
      >
        <SelectTrigger className="px-4 md:px-8 py-3 text-base text-[#667185] font-normal border md:border-0 border-[#D0D5DD] rounded-md md:rounded-none md:border-r h-full">
          <SelectValue placeholder="Service: All" />
        </SelectTrigger>
        <SelectContent className="bg-[#FFFFFF] rounded-[16px] border-none p-2 text-base text-[#344054] font-normal">
          <SelectItem value="all">All</SelectItem>
          {serviceTypes.map((service) => (
            <SelectItem value={service.id} key={service.id}>
              {service.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedLocation}
        onValueChange={(value) => setSelectedLocation(value)}
      >
        <SelectTrigger className="px-4 md:px-8 py-3 text-base text-[#667185] font-normal border md:border-0 border-[#D0D5DD] rounded-md md:rounded-none h-full">
          <SelectValue placeholder="Location: All" />
        </SelectTrigger>
        <SelectContent className="bg-[#FFFFFF] rounded-[16px] border-none p-2 text-base text-[#344054] font-normal">
          <SelectItem value="all">All</SelectItem>
          {lagosLGA.map((lga) => (
            <SelectItem value={lga} key={lga}>
              {lga}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
