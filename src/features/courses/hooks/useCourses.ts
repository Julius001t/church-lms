import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/features/auth/store/useAuthStore";

import { getCourses } from "../api/courseApi";

export function useCourses() {
  const access = useAuthStore(
    (state) => state.access,
  );

  return useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
    enabled: !!access,
  });
}