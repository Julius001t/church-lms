import { useQuery } from "@tanstack/react-query";

import api from "../../../lib/api";

import type { ExamAttempt } from "../types/exam";

interface ExamAttemptListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ExamAttempt[];
}

async function fetchExamAttempts(): Promise<ExamAttempt[]> {
  const response = await api.get<ExamAttemptListResponse>(
    "/exams/attempts/"
  );

  return response.data.results;
}

export function useExamAttempts() {
  return useQuery<ExamAttempt[], Error>({
    queryKey: ["exam-attempts"],
    queryFn: fetchExamAttempts,
  });
}