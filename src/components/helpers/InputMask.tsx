import { useState, ChangeEvent, KeyboardEvent, forwardRef } from "react";
import { Input } from "@/components/ui/input";

type DateInputProps = {
  value?: string | Date;
  onChange?: (value: string) => void;
  name?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onBlur?: () => void;
};
export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (props, ref) => {
    const {
      value,
      onChange,
      name,
      id = "date-input",
      placeholder = "MM/DD/YYYY",
      disabled,
      className,
      onBlur,
      ...rest
    } = props;

    const [internalValue, setInternalValue] = useState("");

    const displayValue =
      value !== undefined
        ? value instanceof Date
          ? `${(value.getMonth() + 1).toString().padStart(2, "0")}/${value.getDate().toString().padStart(2, "0")}/${value.getFullYear()}`
          : value
        : internalValue;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value.replace(/\D/g, "");

      if (input.length <= 8) {
        let formatted = "";

        if (input.length > 0) {
          formatted = input.substring(0, Math.min(2, input.length));
        }

        if (input.length > 2) {
          formatted += "/" + input.substring(2, Math.min(4, input.length));
        }

        if (input.length > 4) {
          formatted += "/" + input.substring(4, 8);
        }

        if (onChange) {
          onChange(formatted);
        } else {
          setInternalValue(formatted);
        }
      }
    };

    return (
      <Input
        ref={ref}
        id={id}
        name={name}
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        onBlur={onBlur}
        {...rest}
      />
    );
  }
);

type KcalInputProps = {
  value?: string | number;
  onChange?: (value: string) => void;
  name?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onBlur?: () => void;
};

export const KcalInput = forwardRef<HTMLInputElement, KcalInputProps>(
  (props, ref) => {
    const {
      value,
      onChange,
      name,
      id = "kcal-input",
      placeholder = "Enter calories",
      disabled,
      className,
      onBlur,
      ...rest
    } = props;

    const [internalValue, setInternalValue] = useState("");

    const displayValue =
      value !== undefined
        ? typeof value === "number"
          ? `${value} kcal`
          : value
        : internalValue;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value.replace(/[^\d]/g, "");

      if (input.length <= 4) {
        const numValue = parseInt(input || "0");

        if (numValue <= 9999) {
          const formatted = input ? `${input} kcal` : "";

          if (onChange) {
            onChange(input);
          } else {
            setInternalValue(formatted);
          }
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      const currentValue = typeof displayValue === "string" ? displayValue : "";

      if (e.key === "Backspace" && currentValue.endsWith(" kcal")) {
        e.preventDefault();
        const newValue = currentValue.replace(" kcal", "").slice(0, -1) || "";

        if (onChange) {
          onChange(newValue);
        } else {
          setInternalValue(newValue);
        }
      }
    };

    return (
      <Input
        ref={ref}
        id={id}
        name={name}
        value={displayValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        onBlur={onBlur}
        {...rest}
      />
    );
  }
);
