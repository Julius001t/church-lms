import api from "@/lib/api";

import type {
  Exam,
  ExamListItem,
  SubmitExamPayload,
  SubmitExamResponse,
  ExamReview,
} from "../types/exam";

/**
 * Get a single exam
 */
export async function getExam(
  examId: string
): Promise<Exam> {
  const { data } = await api.get<Exam>(
    `/exams/${examId}/`
  );

  return data;
}

/**
 * Get all published exams
 */
export async function getExams(): Promise<ExamListItem[]> {
  const { data } = await api.get<ExamListItem[]>(
    "/exams/"
  );

  return data;
}

/**
 * Submit exam answers
 */
export async function submitExam(
  examId: string,
  payload: SubmitExamPayload
): Promise<SubmitExamResponse> {
  const { data } = await api.post<SubmitExamResponse>(
    `/exams/${examId}/submit/`,
    payload
  );

  return data;
}

/**
 * Review a submitted exam attempt
 */
export async function getExamReview(
  attemptId: string
): Promise<ExamReview> {
  const { data } = await api.get<ExamReview>(
    `/exams/attempts/${attemptId}/review/`
  );

  return data;
}