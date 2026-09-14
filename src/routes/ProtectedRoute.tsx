import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/features/auth/store/useAuthStore";

export default function ProtectedRoute() {
  const access = useAuthStore(
    (state) => state.access,
  );

  if (!access) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
}