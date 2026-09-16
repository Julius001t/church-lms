import { NavLink, useNavigate } from "react-router-dom";

import {
  Award,
  Bell,
  BookOpen,
  ClipboardList,
  LogOut,
  User,
  Users,
  X,
} from "lucide-react";

import { useAuthStore } from "@/features/auth/store/useAuthStore";

const menus = [
  {
    name: "Courses",
    icon: BookOpen,
    path: "/courses",
  },
  {
    name: "Exams",
    icon: ClipboardList,
    path: "/exams",
  },
  {
    name: "Certificates",
    icon: Award,
    path: "/certificates",
  },
  {
    name: "Enrollments",
    icon: Users,
    path: "/enrollments",
  },
  {
    name: "Notifications",
    icon: Bell,
    path: "/notifications",
  },
  {
    name: "Profile",
    icon: User,
    path: "/profile",
  },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({
  onClose,
}: SidebarProps) {
  const navigate = useNavigate();

  const logout = useAuthStore(
    (state) => state.logout,
  );

  function handleLogout() {
    logout();

    onClose?.();

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <div className="flex h-full w-full flex-col bg-white">

      {/* =====================================================
          MOBILE HEADER
      ===================================================== */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-5 md:hidden">

        <div className="flex items-center gap-2">
          <BookOpen
            size={24}
            className="text-blue-600"
          />

          <span className="text-lg font-bold text-gray-900">
            Church LMS
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>

      </div>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}
      <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-5">

        <div className="space-y-1.5">

          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.name}
                to={menu.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`
                }
              >
                <Icon
                  size={19}
                  strokeWidth={1.8}
                />

                <span>{menu.name}</span>
              </NavLink>
            );
          })}

        </div>

      </nav>

      {/* =====================================================
          LOGOUT
      ===================================================== */}
      <div className="shrink-0 border-t border-gray-200 bg-white p-4">

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut
            size={20}
            strokeWidth={1.8}
          />

          <span>Logout</span>
        </button>

      </div>

    </div>
  );
}