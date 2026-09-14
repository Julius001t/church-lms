import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
} from "react";

import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

interface PasswordInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const PasswordInput = forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ label, error, className, ...props }, ref) => {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div className="space-y-2">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <div className="relative">
        <input
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={clsx(
            "w-full rounded-lg border px-4 py-3 pr-12 outline-none transition",
            "focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
            error
              ? "border-red-500"
              : "border-gray-300",
            className,
          )}
          {...props}
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword(!showPassword)
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;