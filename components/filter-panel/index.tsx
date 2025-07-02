"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "../ui/input";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const experienceLevels = [
  { value: "LESS_THAN_1_YEAR", label: "Less than 1 year" },
  { value: "ONE_TO_TWO_YEARS", label: "1 - 2 years" },
  { value: "THREE_TO_FOUR_YEARS", label: "3 - 4 years" },
  { value: "FIVE_TO_SEVEN_YEARS", label: "5 - 7 years" },
  { value: "EIGHT_TO_TEN_YEARS", label: "8 - 10 years" },
  { value: "OVER_TEN_YEARS", label: "Over 10 years" },
];

const languageOptions = [
  "English",
  "Igbo",
  "Yoruba",
  "Hausa",
  "Fulani",
  "Ijesa",
  "Egba",
  "Calabar",
  "Edo",
  "French",
  "Spanish",
];
const ethnicityOptions = [
  "Igbo",
  "Yoruba",
  "Hausa",
  "Fulani",
  "Efik",
  "Tiv",
  "Ijesa",
  "Egba",
  "Calabar",
  "Edo",
];

const FilterPanel = ({ visible, onClose }: Props) => {
  const [rateRange, setRateRange] = useState<[number, number]>([3, 300]);
  const [experience, setExperience] = useState("");
  const [gender, setGender] = useState<string[]>([]);
  const [ethnicity, setEthnicity] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  const formatCurrency = (value: number) => {
    return `NGN ${value}${value >= 1000 ? "K" : ""}`;
  };

  const clearFilters = () => {
    setRateRange([3, 300]);
    setExperience("");
    setGender([]);
    setEthnicity([]);
    setLanguages([]);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex transition-all duration-300 h-screen",
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "bg-black/40 w-full transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "bg-white h-full fixed right-0 top-0 z-50 transition-transform duration-300 ease-in-out shadow-xl border-l border-[#EAECF0]",
          "w-full max-w-[750px] overflow-y-auto",
          visible ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center p-8 border-b border-[#D0D5DD]">
          <h2 className="text-lg font-semibold text-[#344054]">Filters</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full border border-[#D0D5DD] w-10 h-10 p-2"
          >
            <X className="text-[#344054]" />
          </Button>
        </div>

        <div className="space-y-8 px-8 py-6">
          {/* Experience */}
          <div>
            <label className="text-base font-semibold text-[#667185] block mb-1">
              Filter by experience
            </label>
            <Select value={experience} onValueChange={setExperience}>
              <SelectTrigger className="border-[#D0D5DD] rounded-[12px] py-3 px-4 text-[#667085] h-10">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-[12px] border border-[#D0D5DD] text-[#667085]">
                {experienceLevels.map((level) => (
                  <SelectItem value={level.value}>{level.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Monthly Rate */}
          <div>
            <Label className="text-base font-semibold text-[#667185] block mb-4">
              Filter by rate
            </Label>
            <div className="flex items-center gap-6">
              <div className="w-full">
                <Label className="text-sm text-[#344054] font-normal">
                  From
                </Label>
                <div className="flex items-center">
                  <div className="inline-flex bg-[#F0F2F5] items-center h-10 px-3 border border-[#D0D5DD] border-r-0 rounded-l-[10px] text-sm text-[#344054] font-normal">
                    NGN
                  </div>
                  <Input
                    type="text"
                    placeholder=""
                    className="rounded-l-none flex-1 px-3 h-10 border-[#D0D5DD] rounded-r-[10px] bg-white focus:outline-none focus:border-0 text-sm text-[#344054] font-normal"
                  />
                </div>
              </div>
              <div className="w-full">
                <Label className="text-sm text-[#344054] font-normal">To</Label>
                <div className="flex items-center">
                  <div className="inline-flex bg-[#F0F2F5] items-center h-10 px-3 border border-[#D0D5DD] border-r-0 rounded-l-[10px] text-sm text-[#344054] font-normal">
                    NGN
                  </div>
                  <Input
                    type="text"
                    placeholder=""
                    className="rounded-l-none flex-1 px-3 h-10 border-[#D0D5DD] rounded-r-[10px] bg-white focus:outline-none focus:border-0 text-sm text-[#344054] font-normal"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="text-base font-semibold text-[#667185] block mb-4">
              Filter by gender
            </label>
            <ToggleGroup
              type="multiple"
              value={gender}
              onValueChange={setGender}
              className="flex justify-start gap-2"
            >
              {["Male", "Female"].map((label) => (
                <ToggleGroupItem
                  key={label}
                  value={label.toLowerCase()}
                  className="data-[state=on]:bg-[var(--ulo-orange)] data-[state=on]:text-white bg-white text-[#344054] border border-[#D0D5DD] rounded-[8px] px-2 py-[6px] text-sm font-medium h-8"
                >
                  {label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Ethnicity */}
          <div>
            <label className="text-base font-semibold text-[#667185] block mb-4">
              Filter by Ethnicity
            </label>
            <ToggleGroup
              type="multiple"
              value={ethnicity}
              onValueChange={setEthnicity}
              className="flex justify-start gap-2 flex-wrap"
            >
              {ethnicityOptions.map((label) => (
                <ToggleGroupItem
                  key={label}
                  value={label.toLowerCase()}
                  className="data-[state=on]:bg-[var(--ulo-orange)] data-[state=on]:text-white bg-white text-[#344054] border border-[#D0D5DD] rounded-[8px] px-2 py-[6px] text-sm font-medium h-8"
                >
                  {label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Languages */}
          <div>
            <label className="text-base font-semibold text-[#667185] block mb-4">
              Filter by Languages spoken
            </label>
            <ToggleGroup
              type="multiple"
              value={languages}
              onValueChange={setLanguages}
              className="flex justify-start gap-2 flex-wrap"
            >
              {languageOptions.map((label) => (
                <ToggleGroupItem
                  key={label}
                  value={label.toLowerCase()}
                  className="data-[state=on]:bg-[var(--ulo-orange)] data-[state=on]:text-white bg-white text-[#344054] border border-[#D0D5DD] rounded-[8px] px-2 py-[6px] text-sm font-medium h-8"
                >
                  {label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between bg-[#F7F9FC] gap-2 p-8 border-t border-[#E4E7EC]">
          <Button
            variant="outline"
            className=" text-[#344054] bg-white border-[#D0D5DD] h-9"
            onClick={clearFilters}
          >
            Clear filters
          </Button>
          <Button className="bg-[var(--ulo-orange)] hover:bg-[var(--ulo-orange)]/90 h-9">
            Apply filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
