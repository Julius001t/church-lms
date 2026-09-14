import { useQuery } from "@tanstack/react-query";

import { getEnrollments } from "../api/enrollmentApi";

export function useEnrollments() {
  return useQuery({
    queryKey: ["enrollments"],
    queryFn: getEnrollments,
  });
}