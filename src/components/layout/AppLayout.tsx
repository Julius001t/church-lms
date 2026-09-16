import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 md:block">
        <Sidebar />
      </aside>

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =====================================================
          MOBILE SIDEBAR
      ===================================================== */}
      <aside
        className={`fixed inset-y-0 left-0 z-[70] w-72 bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <Sidebar
          onClose={() => setSidebarOpen(false)}
        />
      </aside>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <div className="ml-0 flex min-w-0 flex-1 flex-col md:ml-72">

        {/* Header */}
        <div className="shrink-0">
          <Header
            onMenuClick={() => setSidebarOpen(true)}
          />
        </div>

        {/* Page */}
        <main className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}