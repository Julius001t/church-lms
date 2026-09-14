import { Outlet } from "react-router-dom";

import Header from "./Header";
import HomeFooter from "@/features/home/components/HomeFooter";

export default function WebsiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <HomeFooter />
    </div>
  );
}