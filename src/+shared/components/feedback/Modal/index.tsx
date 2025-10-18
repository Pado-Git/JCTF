import * as React from "react";
import { cn } from "@/+shared/utils";
import { Portal } from "../../overlay/Portal";
import { useModal } from "./index.hooks";
import { IcoExitFilled } from "@/+shared/assets";

export interface ModalProps {
  children: React.ReactNode;
  show: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  disableOutsideClick?: boolean;
  className?: string;
  innerClassName?: string;
  timeout?: number;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showHeader?: boolean;
}

export function Modal({
  children,
  show,
  onClose,
  title,
  description,
  showCloseButton = true,
  disableOutsideClick = false,
  className,
  innerClassName,
  timeout = 300,
  size = "md",
  showHeader = true,
}: ModalProps) {
  const { containerRef, innerContainerRef, isVisible, finalChildren } = useModal({
    show,
    onClose,
    disableOutsideClick,
    timeout,
    children,
  });

  if (!show && !isVisible) return null;

  return (
    <Portal>
      <div
        ref={containerRef}
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center",
          "bg-black/80",
          "transition-opacity duration-300 ease-in-out",
          show ? "opacity-100" : "opacity-0",
          className
        )}
        style={{ "--timeout": `${timeout}ms` } as React.CSSProperties}
      >
        <div
          ref={innerContainerRef}
          className={cn(
            "relative w-full p-10 flex flex-col gap-8",
            "bg-neutral-800 border-2 border-neutral-500",
            "rounded-radius-md min-w-[430px]",
            "transition-transform duration-300 ease-in-out",

            show ? "translate-y-0 scale-100" : "translate-y-4 scale-95",
            // Size variants
            {
              "max-w-sm": size === "sm",
              "max-w-md": size === "md",
              "max-w-lg": size === "lg", 
              "max-w-xl": size === "xl",
              "max-w-4xl": size === "full",
            },
            innerClassName
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {showHeader && (title || description || showCloseButton) && (
            <div className="flex items-start justify-between">
              <div className="flex-1 flex flex-col gap-2">
                {title && (
                  <h2 className="typo-heading-medium">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="typo-body-medium text-neutral-50">
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-2 text-neutral-100 hover:text-neutral-400 transition-colors"
                  aria-label="Close modal"
                >
                  <IcoExitFilled className="w-6 h-6" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className={cn(
            "flex flex-col gap-8",
            !showHeader && ""
          )}>
            {finalChildren}
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default Modal;