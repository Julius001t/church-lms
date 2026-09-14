import { useQuery } from "@tanstack/react-query";

import { getModules } from "../api/learningApi";

export function useModules(courseId: string) {
  return useQuery({
    queryKey: ["modules", courseId],
    queryFn: () => getModules(courseId),
    enabled: !!courseId,
  });
}