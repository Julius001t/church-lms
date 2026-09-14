import { useQuery } from "@tanstack/react-query";

import api from "../../../lib/api";

import type { ExamReview } from "../types/exam";

async function fetchExamReview(
  attemptId: string,
): Promise<ExamReview> {
  const response = await api.get<ExamReview>(
    `/exams/attempts/${attemptId}/review/`,
  );

  return response.data;
}

export function useExamReview(attemptId: string) {
  return useQuery<ExamReview, Error>({
    queryKey: ["exam-review", attemptId],
    queryFn: () => fetchExamReview(attemptId),
    enabled: Boolean(attemptId),
  });
}