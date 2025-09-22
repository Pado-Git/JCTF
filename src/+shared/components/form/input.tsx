import * as React from "react";

import { cn } from "@/+shared/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "flex h-12 w-full min-w-0 rounded-radius-sm border px-4 py-3 typo-body-medium",
        "bg-neutral-900 border-neutral-600 text-neutral-100",
        "placeholder:text-neutral-200",
        "transition-all",
        "outline-none",
        
        // Focus styles
        "focus:bg-neutral-700 focus:border-primary",
        
        // Error styles
        "aria-invalid:border-error aria-invalid:ring-1 aria-invalid:ring-error",
        
        // Disabled styles
        "disabled:bg-neutral-800 disabled:border-neutral-600 disabled:text-neutral-300 disabled:cursor-not-allowed disabled:opacity-50",
        
        // File input styles
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-100",
        
        // Selection styles
        "selection:bg-primary selection:text-primary-foreground",
        
        className,
      )}
      {...props}
    />
  );
}

export { Input };
