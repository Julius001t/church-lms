import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";

import AuthLayout from "@/features/auth/components/AuthLayout";
import { useRegister } from "@/features/auth/hooks/useRegister";

import {
  registerSchema,
  type RegisterFormData,
} from "@/features/auth/schemas/registerSchema";

export default function RegisterPage() {
  const navigate = useNavigate();

  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    // Don't send confirm_password to the backend
    const { confirm_password, ...registerData } = data;

    registerMutation.mutate(registerData, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your learning journey with Church LMS"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Full Name */}
        <Input
          id="full_name"
          label="Full Name"
          placeholder="John Doe"
          autoComplete="name"
          {...register("full_name")}
          error={errors.full_name?.message}
        />

        {/* Email */}
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="john@example.com"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
        />

        {/* Phone Number */}
        <Input
          id="phone_number"
          label="Phone Number"
          placeholder="08012345678"
          autoComplete="tel"
          {...register("phone_number")}
          error={errors.phone_number?.message}
        />

        {/* Password */}
        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="new-password"
          {...register("password")}
          error={errors.password?.message}
        />

        {/* Confirm Password */}
        <PasswordInput
          id="confirm_password"
          label="Confirm Password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          {...register("confirm_password")}
          error={errors.confirm_password?.message}
        />

        {/* API Error */}
        {registerMutation.isError && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            Unable to create your account. Please check
            your information and try again.
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {registerMutation.isPending
            ? "Creating Account..."
            : "Create Account"}
        </button>

        {/* Login */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}