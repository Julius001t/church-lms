import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/ui/Input";

import AuthLayout from "@/features/auth/components/AuthLayout";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/features/auth/schemas/forgotPasswordSchema";


export default function ForgotPasswordPage() {
  const forgotPasswordMutation =
    useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } =
    useForm<ForgotPasswordFormData>({
      resolver: zodResolver(
        forgotPasswordSchema
      ),
    });


  function onSubmit(
    data: ForgotPasswordFormData
  ) {
    forgotPasswordMutation.mutate(
      data.email
    );
  }


  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a reset link"
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

        {forgotPasswordMutation.isSuccess && (
          <div
            role="status"
            className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
          >
            If an account exists with this email,
            a password reset link has been sent.
            Please check your inbox.
          </div>
        )}

        {forgotPasswordMutation.isError && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            Unable to send the reset email.
            Please try again.
          </div>
        )}

        <button
          type="submit"
          disabled={
            forgotPasswordMutation.isPending
          }
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {forgotPasswordMutation.isPending
            ? "Sending..."
            : "Send Reset Link"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}