import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import api from "../../../lib/api";

import type {
  SubmitExamPayload,
  SubmitExamResponse,
} from "../types/exam";

// =========================================================
// TYPES
// =========================================================

interface SubmitExamVariables {
  examId: string;
  payload: SubmitExamPayload;
}

export interface SubmitExamError {
  code?: string;
  message: string;
  course_id?: string;
  course_title?: string;
}

// =========================================================
// CUSTOM EXAM ERROR
// =========================================================

export class ExamSubmissionError extends Error
  implements SubmitExamError
{
  code?: string;
  course_id?: string;
  course_title?: string;

  constructor({
    message,
    code,
    course_id,
    course_title,
  }: SubmitExamError) {
    super(message);

    this.name = "ExamSubmissionError";

    this.code = code;
    this.course_id = course_id;
    this.course_title = course_title;

    // Helps instanceof work correctly in some environments.
    Object.setPrototypeOf(
      this,
      ExamSubmissionError.prototype,
    );
  }
}

// =========================================================
// SUBMIT EXAM
// =========================================================

async function submitExam({
  examId,
  payload,
}: SubmitExamVariables): Promise<SubmitExamResponse> {
  try {
    const response = await api.post<SubmitExamResponse>(
      `/exams/${examId}/submit/`,
      payload,
    );

    return response.data;
  } catch (error) {
    // =====================================================
    // AXIOS ERROR
    // =====================================================

    if (axios.isAxiosError(error)) {
      const data = error.response?.data;

      // ===================================================
      // CUSTOM BACKEND ERROR
      // ===================================================
      //
      // {
      //   "code": "NOT_ENROLLED",
      //   "message": "You need to enroll...",
      //   "course_id": "...",
      //   "course_title": "..."
      // }
      //

      if (
        data &&
        typeof data === "object" &&
        !Array.isArray(data) &&
        typeof data.message === "string"
      ) {
        throw new ExamSubmissionError({
          message: data.message,

          code:
            typeof data.code === "string"
              ? data.code
              : undefined,

          course_id:
            typeof data.course_id === "string"
              ? data.course_id
              : undefined,

          course_title:
            typeof data.course_title === "string"
              ? data.course_title
              : undefined,
        });
      }

      // ===================================================
      // DRF DETAIL ERROR
      // ===================================================
      //
      // {
      //   "detail": "You have already submitted this exam."
      // }
      //

      if (
        data &&
        typeof data === "object" &&
        !Array.isArray(data) &&
        typeof data.detail === "string"
      ) {
        throw new Error(data.detail);
      }

      // ===================================================
      // ARRAY ERROR
      // ===================================================
      //
      // [
      //   "You must answer all questions."
      // ]
      //

      if (Array.isArray(data)) {
        throw new Error(data.join(" "));
      }
    }

    // =====================================================
    // FALLBACK ERROR
    // =====================================================

    throw new Error(
      "Failed to submit exam. Please try again.",
    );
  }
}

// =========================================================
// REACT QUERY MUTATION
// =========================================================

export function useSubmitExam() {
  return useMutation<
    SubmitExamResponse,
    Error | ExamSubmissionError,
    SubmitExamVariables
  >({
    mutationFn: submitExam,
  });
}