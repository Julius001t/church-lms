import { NavLink, useNavigate } from "react-router-dom";

import {
  Award,
  Bell,
  BookOpen,
  ClipboardList,
  LogOut,
  User,
  Users,
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

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = useAuthStore(
    (state) => state.logout,
  );

  function handleLogout() {
    logout();

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <aside className="flex h-full w-full flex-col border-r border-gray-200 bg-white">
      {/* =====================================================
          SCROLLABLE NAVIGATION
      ===================================================== */}

      <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-5">
        <div className="space-y-1.5">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.name}
                to={menu.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
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
          Stays at bottom
      ===================================================== */}

      <div className="shrink-0 border-t border-gray-200 bg-white p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut
            size={20}
            strokeWidth={1.8}
          />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}