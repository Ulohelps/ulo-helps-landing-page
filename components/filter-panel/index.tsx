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

type Props = {
  visible: boolean;
  onClose: () => void;
};

const FilterPanel = ({ visible, onClose }: Props) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex transition-all duration-300",
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
        <div className="flex justify-between items-center  p-6 mb-6">
          <h2 className="text-2xl font-semibold text-[#344054]">Filters</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full border border-[#D0D5DD] w-12 h-12 p-[14px]"
          >
            <X className="text-[#344054]" />
          </Button>
        </div>

        <div className="space-y-6  p-6">
          {/* Experience */}
          <div>
            <label className="text-sm font-medium text-[#344054] block mb-1">
              Filter by experience
            </label>
            <Select>
              <SelectTrigger className="border-[#D0D5DD] text-[#667185]">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 year</SelectItem>
                <SelectItem value="2">2 years</SelectItem>
                <SelectItem value="3">3+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Monthly Rate */}
          <div>
            <label className="text-sm font-medium text-[#344054] block mb-2">
              Filter by rate
            </label>
            <Slider defaultValue={[30]} min={10} max={300} step={10} />
            <div className="flex justify-between text-sm text-[#667085] mt-2">
              <span>NGN 10k</span>
              <span>NGN 30k</span>
              <span>NGN 70k</span>
              <span>NGN 300k</span>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium text-[#344054] block mb-2">
              Filter by gender
            </label>
            <ToggleGroup type="multiple" className="flex gap-2 flex-wrap">
              {["Male", "Female"].map((label) => (
                <ToggleGroupItem
                  key={label}
                  value={label.toLowerCase()}
                  className="data-[state=on]:bg-[#1570EF] data-[state=on]:text-white bg-[#F2F4F7] text-[#344054] border-none rounded-md px-4 py-2 text-sm"
                >
                  {label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Ethnicity */}
          <div>
            <label className="text-sm font-medium text-[#344054] block mb-2">
              Filter by Ethnicity
            </label>
            <ToggleGroup type="multiple" className="flex gap-2 flex-wrap">
              {["Yoruba", "Igbo", "Hausa", "Other"].map((label) => (
                <ToggleGroupItem
                  key={label}
                  value={label.toLowerCase()}
                  className="data-[state=on]:bg-[#1570EF] data-[state=on]:text-white bg-[#F2F4F7] text-[#344054] border-none rounded-md py-2 text-sm"
                >
                  {label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Languages */}
          <div>
            <label className="text-sm font-medium text-[#344054] block mb-2">
              Filter by Languages spoken
            </label>
            <ToggleGroup type="multiple" className="flex gap-2 flex-wrap">
              {["English", "Yoruba", "Igbo", "Hausa", "Other"].map((label) => (
                <ToggleGroupItem
                  key={label}
                  value={label.toLowerCase()}
                  className="data-[state=on]:bg-[#1570EF] data-[state=on]:text-white bg-[#F2F4F7] text-[#344054] border-none rounded-md px-4 py-2 text-sm"
                >
                  {label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-between gap-2 pt-4 px-6 bg-[#F7F9FC]">
          <Button variant="ghost" className="flex-1 text-[#344054]">
            Cancel
          </Button>
          <Button
            variant="outline"
            className="flex-1 text-[#344054] border-[#D0D5DD]"
          >
            Clear filters
          </Button>
          <Button>Apply filters</Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
