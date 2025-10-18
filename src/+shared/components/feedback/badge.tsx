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

  // Tag Status
  tag: {
    backgroundColor: 'var(--color-primary-900)', 
    color: 'var(--color-primary-400)',
  },
  greyTag: {
    backgroundColor: 'var(--color-neutral-600)',
    color: 'var(--color-neutral-200)'
  },
  disabled: {
    backgroundColor: 'var(--color-neutral-700)',
    color: 'var(--color-neutral-500)'
  },
  
  primary: { 
    backgroundColor: 'var(--color-primary)', 
    color: 'var(--color-neutral-0)' 
  },

  // Etc
  blue: {
    backgroundColor: '#1E3A8A',
    color: '#BFDBFE'
  }
} as const;

export type BadgeVariant = keyof typeof BADGE_STYLES;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  asChild?: boolean;
  icon?: React.ReactNode;
}

// Badge 텍스트 매핑
const BADGE_TEXT = {
  // Competition Status
  live: "Live",
  upcoming: "Upcoming", 
  ended: "Ended",
  
  // Level Status
  easy: "Easy",
  beginner: "Beginner",
  medium: "Medium",
  advanced: "Advanced",
  hard: "Hard",
  expert: "Expert",
  
  // Participant Status
  participant: "Participant",
  
  primary: "Primary"
} as const;

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', icon, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";
    
    // variant에 따른 스타일 가져오기
    const variantStyle = BADGE_STYLES[variant] || BADGE_STYLES.primary;
    
    // children이 없으면 variant에 따른 텍스트 사용
    const displayText = children || BADGE_TEXT[variant] || BADGE_TEXT.primary;

    // variant에 따른 텍스트 크기 결정
    const getTextSize = () => {
      if (variant === 'tag' || variant === 'disabled' || variant === 'greyTag') {
        return 'typo-body-xsmall';
      }
      return 'typo-body-xsmall-bold';
    };

    return (
      <Comp
        ref={ref}
        data-slot="badge"
        className={cn(
          "w-fit rounded-radius-xs px-2 py-1 whitespace-nowrap shrink-0 gap-1 [&>svg]:size-3 [&>svg]:pointer-events-none transition-[color,box-shadow] overflow-hidden flex items-center justify-center",
          getTextSize(),
          className
        )}
        style={variantStyle}
        {...props}
      >
        {icon && <span className="flex items-center">{icon}</span>}
        {displayText}
      </Comp>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, BADGE_STYLES };
