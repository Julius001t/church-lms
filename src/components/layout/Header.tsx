import {
  BookOpen,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";

import { useAuthStore } from "@/features/auth/store/useAuthStore";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const access = useAuthStore(
    (state) => state.access,
  );

  const isAuthenticated = Boolean(access);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
      {/* =====================================================
          MAIN HEADER
      ===================================================== */}

      <div className="flex h-16 items-center px-6">
        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2"
        >
          <BookOpen
            size={26}
            className="text-blue-600"
          />

          <span className="text-xl font-bold text-gray-900">
            Church LMS
          </span>
        </Link>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav className="ml-10 hidden items-center gap-7 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/courses"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Courses
          </Link>

          <a
            href="#about"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            About
          </a>

          <a
            href="#contact"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Contact
          </a>

          {/* =================================================
              DASHBOARD
          ================================================= */}

          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              <LayoutDashboard size={18} />

              <span>Dashboard</span>
            </Link>
          )}
        </nav>

        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() =>
            setIsMenuOpen((prev) => !prev)
          }
          className="ml-auto rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
          aria-label={
            isMenuOpen
              ? "Close menu"
              : "Open menu"
          }
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <nav className="px-4 py-4">
            <div className="flex flex-col gap-1">
              {/* Home */}

              <Link
                to="/"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-blue-600"
              >
                Home
              </Link>

              {/* Courses */}

              <Link
                to="/courses"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-blue-600"
              >
                Courses
              </Link>

              {/* About */}

              <a
                href="#about"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-blue-600"
              >
                About
              </a>

              {/* Contact */}

              <a
                href="#contact"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-blue-600"
              >
                Contact
              </a>

              {/* Dashboard */}

              {isAuthenticated && (
                <>
                  <div className="my-2 border-t border-gray-200" />

                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    <LayoutDashboard
                      size={18}
                    />

                    <span>Dashboard</span>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}