import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/+shared/utils';
import { IcoSearchLined } from '@/+shared/assets';

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  placeholder?: string;
  onSearch?: (value: string) => void;
  showSearchIcon?: boolean;
  className?: string;
}

export function SearchInput({
  placeholder = "Search...",
  onSearch,
  showSearchIcon = true,
  className,
  onChange,
  ...props
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    onChange?.(e);
    onSearch?.(e.target.value);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          "flex h-10 w-full rounded-radius-sm border px-4 py-2 typo-body-small",
          "bg-neutral-900 border border-neutral-600 text-neutral-100",
          "placeholder:text-neutral-200",
          "transition-all duration-200",
          "outline-none",
          
          isFocused && "bg-neutral-700 border-primary-500 text-neutral-100",
          
          "disabled:bg-neutral-800 disabled:border-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50",
          
          showSearchIcon && "pr-10",
          
          className
        )}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {showSearchIcon && (
        <IcoSearchLined 
          className={cn(
            "absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-200",
            isFocused ? "text-neutral-0" : "text-neutral-400"
          )} 
        />
      )}
    </div>
  );
}

export default SearchInput;
