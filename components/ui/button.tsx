import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-[#1D2739] hover:bg-[#523914] hover:text-white focus:border-2 focus:border-[#FFFFFF05] disabled:bg-[#FA6D4D] semibold py-3 px-6 rounded-[48px] shadow-[0px_4px_8px_0px_#52391424]",
        destructive:
          "bg-destructive text-[#CB1A14] border border-[#E26E6A]  py-3 px-6 rounded-[48px] hover:bg-destructive/90",
        outline:
          "border text-[#1D2739] semibold border-[#D0D5DD] bg-white hover:bg-[#F9FAFB] hover:border-[#F0F2F5] focus:bg-[#F0F2F5] focus:border-none disabled:border-2 disabled:border-[#F0F2F5] disabled:text-[#98A2B3] py-3 px-6 rounded-[48px] ",
        secondary:
          "bg-[#F0EABA] text-[#06212C]  hover:bg-[#06212C] hover:text-white focus:border-2 focus:border-[#FFFFFF05] disabled:bg-[#F0EABA] semibold py-3 px-6 rounded-[48px] shadow-[0px_4px_8px_0px_#52391424]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
