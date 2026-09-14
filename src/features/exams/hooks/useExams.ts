import { useQuery } from "@tanstack/react-query";

import api from "../../../lib/api";

import type { ExamListItem } from "../types/exam";

interface ExamListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ExamListItem[];
}

async function fetchExams(): Promise<ExamListItem[]> {
  const response = await api.get<ExamListResponse>("/exams/");

  return response.data.results;
}

export function useExams() {
  return useQuery<ExamListItem[], Error>({
    queryKey: ["exams"],
    queryFn: fetchExams,
  });
}