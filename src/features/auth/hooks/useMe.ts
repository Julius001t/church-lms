import { useQuery } from "@tanstack/react-query";

import { getMe } from "../api/authApi";

export function useMe() {
  const token = localStorage.getItem("access");

  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: Boolean(token),
    retry: false,
  });
}