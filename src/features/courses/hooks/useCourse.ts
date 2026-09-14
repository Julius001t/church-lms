import { useQuery } from "@tanstack/react-query";

import { getCourse } from "../api/courseDetailApi";

export function useCourse(id: string) {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourse(id),
    enabled: !!id,
  });
}