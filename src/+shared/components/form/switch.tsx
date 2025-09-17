"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/+shared/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-[#6366F1] data-[state=unchecked]:bg-neutral-300 focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[22px] w-10 shrink-0 items-center rounded-full transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 border-2 border-neutral-300 data-[state=checked]:border-primary",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-primary-50 dark:data-[state=unchecked]:bg-primary-50 dark:data-[state=checked]:bg-primary-50 pointer-events-none block w-[18px] h-[18px] rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-5px)] data-[state=unchecked]:translate-x-0",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
