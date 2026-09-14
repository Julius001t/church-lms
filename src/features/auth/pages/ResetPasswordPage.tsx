import { Link, useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PasswordInput from "@/components/ui/PasswordInput";

import AuthLayout from "@/features/auth/components/AuthLayout";
import { useResetPassword } from "@/features/auth/hooks/useResetPassword";

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/features/auth/schemas/resetPasswordSchema";


export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const { uid, token } = useParams<{
    uid: string;
    token: string;
  }>();

  const resetPasswordMutation =
    useResetPassword();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } =
    useForm<ResetPasswordFormData>({
      resolver: zodResolver(
        resetPasswordSchema
      ),
    });


  function onSubmit(
    data: ResetPasswordFormData
  ) {
    if (!uid || !token) {
      return;
    }

    resetPasswordMutation.mutate(
      {
        uid,
        token,
        password: data.password,
      },
      {
        onSuccess: () => {
          navigate("/login");
        },
      }
    );
  }


  if (!uid || !token) {
    return (
      <AuthLayout
        title="Invalid reset link"
        subtitle="This password reset link is not valid."
      >
        <div className="text-center">
          <Link
            to="/forgot-password"
            className="font-semibold text-blue-600 hover:underline"
          >
            Request a new reset link
          </Link>
        </div>
      </AuthLayout>
    );
  }


  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Create a new password for your account"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <PasswordInput
          id="password"
          label="New Password"
          placeholder="Enter your new password"
          autoComplete="new-password"
          {...register("password")}
          error={errors.password?.message}
        />

        <PasswordInput
          id="confirm_password"
          label="Confirm Password"
          placeholder="Confirm your new password"
          autoComplete="new-password"
          {...register("confirm_password")}
          error={
            errors.confirm_password?.message
          }
        />

        {resetPasswordMutation.isError && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            This reset link is invalid or
            expired. Please request a new one.
          </div>
        )}

        <button
          type="submit"
          disabled={
            resetPasswordMutation.isPending
          }
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {resetPasswordMutation.isPending
            ? "Resetting Password..."
            : "Reset Password"}
        </button>

        <p className="text-center text-sm text-gray-600">
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