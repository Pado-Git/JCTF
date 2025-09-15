import * as React from "react";

import { cn } from "@/+shared/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "flex h-12 w-full min-w-0 rounded-radius-sm border px-4 py-3 text-base",
        "bg-neutral-900 border-neutral-500 text-neutral-100",
        "placeholder:text-neutral-200",
        "transition-all duration-200",
        "outline-none",
        
        // Focus styles
        "focus:bg-neutral-800 focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
        
        // Error styles
        "aria-invalid:border-error aria-invalid:ring-1 aria-invalid:ring-error",
        
        // Disabled styles
        "disabled:bg-neutral-800 disabled:border-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50",
        
        // File input styles
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-100",
        
        // Selection styles
        "selection:bg-primary-500 selection:text-primary-foreground",
        
        className,
      )}
      {...props}
    />
  );
}

export { Input };
