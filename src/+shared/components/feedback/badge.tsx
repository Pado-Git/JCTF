import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/+shared/utils";

// Badge 스타일 정의
const BADGE_STYLES = {
  // Competition Status
  live: { 
    backgroundColor: 'var(--color-success)', 
    color: 'var(--color-neutral-0)' 
  },
  upcoming: { 
    backgroundColor: 'var(--color-warning)', 
    color: 'var(--color-neutral-0)' 
  },
  ended: { 
    backgroundColor: 'var(--color-neutral-400)', 
    color: 'var(--color-neutral-900)' 
  },
  
  // Level Status
  easy: { 
    backgroundColor: 'var(--color-success-dark)', 
    color: 'var(--color-success)' 
  },
  beginner: { 
    backgroundColor: 'var(--color-success-dark)', 
    color: 'var(--color-success)' 
  },
  medium: { 
    backgroundColor: 'var(--color-warning-dark)', 
    color: 'var(--color-warning)' 
  },
  advanced: { 
    backgroundColor: 'var(--color-warning-dark)', 
    color: 'var(--color-warning)' 
  },
  hard: { 
    backgroundColor: 'var(--color-error-dark)', 
    color: 'var(--color-error)' 
  },
  expert: { 
    backgroundColor: 'var(--color-error-dark)', 
    color: 'var(--color-error)' 
  },
  
  // Participant Status
  participant: { 
    backgroundColor: 'var(--color-neutral-500)', 
    color: 'var(--color-neutral-100)',
    border: '1px solid var(--color-neutral-400)'
  },
  
  primary: { 
    backgroundColor: 'var(--color-primary)', 
    color: 'var(--color-neutral-0)' 
  }
} as const;

export type BadgeVariant = keyof typeof BADGE_STYLES;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  asChild?: boolean;
  icon?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', icon, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";
    
    // variant에 따른 스타일 가져오기
    const variantStyle = BADGE_STYLES[variant] || BADGE_STYLES.primary;

    return (
      <Comp
        ref={ref}
        data-slot="badge"
        className={cn(
          "rounded-radius-xs px-2 py-1 text-body-xsmall-bold whitespace-nowrap shrink-0 gap-1 [&>svg]:size-3 [&>svg]:pointer-events-none transition-[color,box-shadow] overflow-hidden h-6 flex items-center justify-center",
          className
        )}
        style={variantStyle}
        {...props}
      >
        {icon && <span className="flex items-center">{icon}</span>}
        {children}
      </Comp>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, BADGE_STYLES };
