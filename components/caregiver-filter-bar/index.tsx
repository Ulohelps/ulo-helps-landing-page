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

export function CaregiverFilterBar() {
  const router = useRouter();
  return (
    <div className="w-full max-w-[1136px] mx-auto bg-white border border-[#D0D5DD] rounded-[16px] mt-8 flex flex-col md:flex-row md:items-center md:h-[72px] gap-4 md:gap-2">
      <Input
        placeholder="Search by keyword"
        className="py-3 text-base text-[#667185] font-normal px-4 md:px-8 border md:border-0 border-[#D0D5DD] rounded-md md:rounded-none md:border-r"
      />

      <Select>
        <SelectTrigger className="px-4 md:px-8 py-3 text-base text-[#667185] font-normal border md:border-0 border-[#D0D5DD] rounded-md md:rounded-none md:border-r h-full">
          <SelectValue placeholder="Service: All" />
        </SelectTrigger>
        <SelectContent className="bg-[#FFFFFF] rounded-[16px] border-none p-2 text-base text-[#344054] font-normal">
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="nursing">Nursing</SelectItem>
          <SelectItem value="personal-care">Personal Care</SelectItem>
          <SelectItem value="therapy">Therapy</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="px-4 md:px-8 py-3 text-base text-[#667185] font-normal border md:border-0 border-[#D0D5DD] rounded-md md:rounded-none h-full">
          <SelectValue placeholder="Location: All" />
        </SelectTrigger>
        <SelectContent className="bg-[#FFFFFF] rounded-[16px] border-none p-2 text-base text-[#344054] font-normal">
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="lagos">Lagos</SelectItem>
          <SelectItem value="abuja">Abuja</SelectItem>
          <SelectItem value="portharcourt">Port Harcourt</SelectItem>
        </SelectContent>
      </Select>

      <Button
        onClick={() => {
          router.push("/find-caregiver");
        }}
        className="flex items-center justify-center gap-2 w-full md:w-auto py-3 h-full text-base text-[#1D2739] font-semibold rounded-[12px] md:rounded-l-none md:rounded-r-[16px]"
      >
        <Search size={18} />
        Find caregivers
      </Button>
    </div>
  );
}
