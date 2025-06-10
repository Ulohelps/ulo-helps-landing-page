/* eslint-disable @typescript-eslint/no-unused-vars */

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export function PhoneInputField({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Remove all non-digit characters
    value = value.replace(/\D/g, "");

    // Remove leading zero if present
    if (value.startsWith("0")) {
      value = value.substring(1);
    }

    // Limit to 10 digits (typical Nigerian phone number length)
    value = value.substring(0, 10);

    setInputValue(value);
    onChange?.(`+234${value}`);
  };

  // Format the display value with spaces for readability
  const formattedValue = inputValue
    .replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")
    .trim();

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="phone" className="text-sm text-[#344054] font-normal">
        Phone Number
      </Label>
      <div className="flex items-center">
        {/* Fixed Nigeria country code */}
        <div className="inline-flex bg-[#F0F2F5] items-center h-10 px-3 border border-[#D0D5DD] border-r-0 rounded-l-[10px]  text-sm text-[#344054] font-normal">
          +234
        </div>

        {/* Phone number input */}
        <Input
          type="tel"
          id="phone"
          value={formattedValue}
          onChange={handleChange}
          placeholder=""
          className="rounded-l-none flex-1 px-3 h-10 border-[#D0D5DD] rounded-r-[10px] bg-white focus:outline-none focus:border-0 text-sm text-[#344054] font-normal"
        />
      </div>
    </div>
  );
}
