import {
  BookOpen,
  Menu,
  LayoutDashboard,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useAuthStore } from "@/features/auth/store/useAuthStore";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({
  onMenuClick,
}: HeaderProps) {
  const access = useAuthStore(
    (state) => state.access,
  );

  const isAuthenticated = Boolean(access);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">

      <div className="flex h-16 items-center px-4 sm:px-6">

        {/* =================================================
            MOBILE MENU
        ================================================= */}
        <button
          type="button"
          onClick={onMenuClick}
          className="mr-3 rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={26} />
        </button>

        {/* =================================================
            LOGO
        ================================================= */}
        <Link
          to="/"
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
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/courses"
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Courses
          </Link>

          <a
            href="#about"
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            About
          </a>

          <a
            href="#contact"
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Contact
          </a>

          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <LayoutDashboard size={18} />

              <span>Dashboard</span>
            </Link>
          )}

        </nav>

      </div>

    </header>
  );
}