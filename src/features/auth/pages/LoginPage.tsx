import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";

import AuthLayout from "@/features/auth/components/AuthLayout";
import { useLogin } from "@/features/auth/hooks/useLogin";

import {
  loginSchema,
  type LoginFormData,
} from "@/features/auth/schemas/loginSchema";

export default function LoginPage() {
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginFormData) {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
    });
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue learning"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="john@example.com"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <PasswordInput
          id="password"
          label="Password"
          placeholder="********"
          autoComplete="current-password"
          {...register("password")}
          error={errors.password?.message}
        />

        {/* API ERROR */}
        {loginMutation.isError && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            Incorrect credentials. Please check your email and password.
          </div>
        )}

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loginMutation.isPending
            ? "Signing in..."
            : "Log in"}
        </button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>

          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs text-gray-400">
              OR
            </span>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}