import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
  {
    variants: {
      variant: {
        // Primary - Figma Design System
        primary: "bg-primary text-primary-50 hover:bg-primary-600 active:bg-primary-700 disabled:bg-neutral-600 disabled:text-neutral-400",
        // Secondary - Figma Design System  
        secondary: "border border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-50 active:bg-primary-600 active:text-primary-50 disabled:border-neutral-600 disabled:text-neutral-400",
        // Secondary Gray - Figma Design System
        "secondary-gray": "border border-primary-200 bg-transparent text-primary-200 hover:border-neutral-300 hover:text-neutral-300 active:border-neutral-400 active:text-neutral-400 disabled:border-neutral-600 disabled:text-neutral-400",
        // Text - Figma Design System
        text: "bg-transparent text-primary hover:text-primary-600 active:text-primary-700 disabled:text-neutral-400",
      },
      size: {
        // Figma Design System Sizes
        xsmall: "h-8 px-2 text-body-small gap-1 [&_svg]:size-4",
        small: "h-10 px-4 text-body-medium gap-2 [&_svg]:size-4", 
        medium: "h-12 px-6 text-body-large gap-2 [&_svg]:size-5",
        large: "h-14 px-6 text-heading-small gap-2 [&_svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
