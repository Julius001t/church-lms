import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 w-72">
        <Sidebar />
      </aside>

      {/* Main application */}
      <div className="ml-72 flex min-w-0 flex-1 flex-col">

        {/* Header */}
        <div className="shrink-0">
          <Header />
        </div>

        {/* Page content */}
        <main className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}