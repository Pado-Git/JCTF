import * as React from "react";
import { cn } from "@/+shared/utils";
import { Label } from "../label";
import { Input } from "../input";
import { Textarea } from "../textarea";

interface FormFieldProps {
  label: string;
  id: string;
  type?: "text" | "email" | "password" | "tel" | "url";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  variant?: "input" | "textarea";
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export function FormField({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  error,
  helperText,
  variant = "input",
  className,
  inputClassName,
  labelClassName,
}: FormFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label
        htmlFor={id}
        className={cn(
          "typo-body-xsmall",
          error && "text-error",
          labelClassName
        )}
      >
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </Label>
      
      {variant === "input" ? (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            inputClassName
          )}
        />
      ) : (
        <Textarea
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            inputClassName
          )}
        />
      )}
      
      {error && (
        <p className="text-error typo-body-xsmall">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-primary-100 typo-body-xsmall">{helperText}</p>
      )}
    </div>
  );
}
