import { useQuery } from "@tanstack/react-query";

import api from "../../../lib/api";

import type { Exam } from "../types/exam";

async function fetchExam(id: string): Promise<Exam> {
  const response = await api.get<Exam>(`/exams/${id}/`);

  return response.data;
}

export function useExam(id: string) {
  return useQuery<Exam, Error>({
    queryKey: ["exam", id],
    queryFn: () => fetchExam(id),
    enabled: Boolean(id),
  });
}