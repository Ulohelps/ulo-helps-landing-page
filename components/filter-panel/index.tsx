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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
  visible: boolean;
  onClose: () => void;
};

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
                <SelectItem value="0.5">0.5 years</SelectItem>
                <SelectItem value="1">1 year</SelectItem>
                <SelectItem value="2">2 years</SelectItem>
                <SelectItem value="3">3+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Monthly Rate */}
          <div>
            <label className="text-base font-semibold text-[#667185] block mb-4">
              Filter by rate
            </label>
            <p className="text-xs text-[#667085] mb-4">Monthly rate</p>
            <div>
              <Slider
                value={rateRange}
                onValueChange={(value) =>
                  setRateRange(value as [number, number])
                }
                min={10}
                max={300}
                step={10}
                minStepsBetweenThumbs={1}
              />
              <div className="flex justify-between text-base text-[#98A2B3] mt-4">
                <span>{formatCurrency(10)}</span>
                <span>{formatCurrency(30)}</span>
                <span>{formatCurrency(70)}</span>
                <span>{formatCurrency(300)}K</span>
              </div>
              <div className="flex justify-between mt-1 text-xs text-[var(--ulo-orange)] font-medium">
                <span>{formatCurrency(rateRange[0])}</span>
                <span>{formatCurrency(rateRange[1])}</span>
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
              {["Yoruba", "Igbo", "Hausa", "Other"].map((label) => (
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
              {["English", "Yoruba", "Igbo", "Hausa", "Other"].map((label) => (
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
