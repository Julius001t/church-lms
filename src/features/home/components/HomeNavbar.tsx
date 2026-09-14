import { BookOpen, Menu, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import { useAuthStore } from "@/features/auth/store/useAuthStore";

export default function HomeNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-gray-900"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <BookOpen size={20} />
          </div>

          <span>Church LMS</span>
        </Link>

        {/* Explore */}
        <Link
          to="/courses"
          className="hidden text-sm font-medium text-gray-700 transition hover:text-blue-600 md:block"
        >
          Explore Courses
        </Link>

        {/* Search */}
        <div className="hidden flex-1 md:block">
          <div className="relative mx-auto max-w-xl">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="What do you want to learn?"
              className="w-full rounded-full border border-gray-300 bg-gray-50 py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
              >
                Dashboard
              </Link>

              <button
                type="button"
                onClick={logout}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="ml-auto rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-white px-4 py-4 md:hidden">
          <div className="space-y-2">
            <Link
              to="/courses"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
            >
              Explore Courses
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="w-full rounded-lg px-4 py-3 text-left font-medium text-gray-700 hover:bg-gray-100"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}