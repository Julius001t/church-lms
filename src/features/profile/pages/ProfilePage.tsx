import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Phone, Shield } from "lucide-react";

import {
  useProfile,
  useUpdateProfile,
} from "../hooks/useProfile";

export default function ProfilePage() {
  const {
    data: profile,
    isLoading,
    isError,
  } = useProfile();

  const updateProfile = useUpdateProfile();

  const [fullName, setFullName] =
    useState("");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | Load profile into form
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name);
      setPhoneNumber(profile.phone_number);
    }
  }, [profile]);

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm font-medium text-gray-500">
          Loading your profile...
        </p>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Error
  |--------------------------------------------------------------------------
  */

  if (isError || !profile) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="font-medium text-red-500">
            Failed to load your profile.
          </p>

          <Link
            to="/"
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    updateProfile.mutate({
      full_name: fullName.trim(),
      phone_number: phoneNumber.trim(),
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your personal information and account details.
          </p>
        </div>

        {/* ================================================= */}
        {/* PROFILE CARD */}
        {/* ================================================= */}

        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

          {/* ================================================= */}
          {/* PROFILE HEADER */}
          {/* ================================================= */}

          <div className="border-b bg-blue-600 px-6 py-8 sm:px-8">
            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                <User size={30} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  {profile.full_name}
                </h2>

                <p className="mt-1 text-sm text-blue-100">
                  {profile.email}
                </p>
              </div>

            </div>
          </div>

          {/* ================================================= */}
          {/* FORM */}
          {/* ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-6 sm:p-8"
          >

            {/* ================================================= */}
            {/* FULL NAME */}
            {/* ================================================= */}

            <div>
              <label
                htmlFor="full_name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="full_name"
                  type="text"
                  value={fullName}
                  onChange={(event) =>
                    setFullName(event.target.value)
                  }
                  required
                  className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>
            </div>

            {/* ================================================= */}
            {/* EMAIL */}
            {/* ================================================= */}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 py-3 pl-10 pr-4 text-sm text-gray-500"
                />

              </div>

              <p className="mt-2 text-xs text-gray-400">
                Your email address cannot be changed here.
              </p>
            </div>

            {/* ================================================= */}
            {/* PHONE */}
            {/* ================================================= */}

            <div>
              <label
                htmlFor="phone_number"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>

              <div className="relative">

                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="phone_number"
                  type="tel"
                  value={phoneNumber}
                  onChange={(event) =>
                    setPhoneNumber(event.target.value)
                  }
                  className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Enter your phone number"
                />

              </div>
            </div>

            {/* ================================================= */}
            {/* ROLE */}
            {/* ================================================= */}

            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Account Role
              </label>

              <div className="relative">

                <Shield
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="role"
                  type="text"
                  value={profile.role}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 py-3 pl-10 pr-4 text-sm text-gray-500"
                />

              </div>
            </div>

            {/* ================================================= */}
            {/* SUCCESS MESSAGE */}
            {/* ================================================= */}

            {updateProfile.isSuccess && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                Profile updated successfully.
              </div>
            )}

            {/* ================================================= */}
            {/* ERROR MESSAGE */}
            {/* ================================================= */}

            {updateProfile.isError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                Failed to update your profile. Please try again.
              </div>
            )}

            {/* ================================================= */}
            {/* SAVE BUTTON */}
            {/* ================================================= */}

            <div className="flex justify-end border-t pt-6">

              <button
                type="submit"
                disabled={updateProfile.isPending}
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updateProfile.isPending
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </main>
  );
}