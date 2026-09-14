import {
  forwardRef,
  type InputHTMLAttributes,
} from "react";

import clsx from "clsx";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>

        <input
          ref={ref}
          className={clsx(
            "w-full rounded-lg border px-4 py-3 outline-none transition",
            "focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
            error
              ? "border-red-500"
              : "border-gray-300",
            className,
          )}
          {...props}
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;