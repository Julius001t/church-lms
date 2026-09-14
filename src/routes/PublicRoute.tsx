import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export default function PublicRoute() {
  const access = useAuthStore((state) => state.access);

  if (access) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}