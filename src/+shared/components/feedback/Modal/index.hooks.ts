import { useEffect, useRef, useState } from "react";

interface UseModalProps {
  show: boolean;
  onClose?: () => void;
  disableOutsideClick?: boolean;
  timeout?: number;
  children: React.ReactNode;
}

export function useModal({ 
  show, 
  onClose, 
  disableOutsideClick = false, 
  timeout = 300,
  children 
}: UseModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const [finalChildren, setFinalChildren] = useState<React.ReactNode>();

  // Handle outside click
  useEffect(() => {
    if (disableOutsideClick || !show) return;
  
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const isInsideModal = innerContainerRef.current?.contains(target);
  
      if (!isInsideModal) {
        onClose?.();
      }
    };
  
    document.addEventListener("mousedown", handleOutsideClick); // click 대신 mousedown 권장
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [disableOutsideClick, onClose, show]);

  // Handle escape key
  useEffect(() => {
    if (!show) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose, show]);

  // Handle body scroll lock
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  // Handle children animation timing
  useEffect(() => {
    if (show) {
      setFinalChildren(children);
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setFinalChildren(null);
      }, timeout);
      
      return () => clearTimeout(timer);
    }
  }, [show, children, timeout]);

  return {
    containerRef,
    innerContainerRef,
    isVisible,
    finalChildren,
  };
}
