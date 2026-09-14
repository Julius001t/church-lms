import { useQuery } from "@tanstack/react-query";

import { getLessonProgress } from "../api/enrollmentApi";

export function useLessonProgress() {
  return useQuery({
    queryKey: ["lesson-progress"],
    queryFn: getLessonProgress,
  });
}