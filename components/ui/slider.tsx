"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, onValueChange, ...props }, ref) => {
  // Ensure value is always an array with at least one value
  const safeValue = Array.isArray(value) ? value : [value ?? 50];

  return (
    <SliderPrimitive.Root
      ref={ref}
      value={safeValue}
      onValueChange={onValueChange}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-[4px] bg-[#17403A">
        <SliderPrimitive.Range className="absolute h-full bg-[#F0EABA]" />
      </SliderPrimitive.Track>
      {safeValue.map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className="block h-6 w-6 rounded-full border-2 border-[#F0EABA] bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0EABA] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
