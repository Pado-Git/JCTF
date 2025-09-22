"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/+shared/utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-neutral-900 relative h-2 w-full overflow-hidden rounded-radius-rounded",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="gradient-4 rounded-radius-rounded h-full transition-all"
        style={{ 
          width: `${value || 0}%`,
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
