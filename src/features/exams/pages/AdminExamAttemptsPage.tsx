import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  CheckCircle,
  Clock,
  User,
  BookOpen,
} from "lucide-react";

import api from "../../../lib/api";

interface ExamAttempt {
  id: string;
  student: string;
  exam: string;
  score: number;
  passed: boolean;
  status: string;
  submitted_at: string | null;
  result_released: boolean;
}

// =========================================
// FETCH ADMIN EXAM ATTEMPTS
// =========================================

async function fetchAttempts(): Promise<ExamAttempt[]> {
  const response = await api.get<ExamAttempt[]>(
    "/exams/admin/attempts/"
  );

  return response.data;
}

// =========================================
// RELEASE EXAM RESULT
// =========================================

async function releaseResult(attemptId: string) {
  const response = await api.post(
    `/exams/admin/attempts/${attemptId}/release-result/`
  );

  return response.data;
}

// =========================================
// PAGE
// =========================================

export default function AdminExamAttemptsPage() {
  const queryClient = useQueryClient();

  const [releasingAttemptId, setReleasingAttemptId] =
    useState<string | null>(null);

  // =========================================
  // FETCH ATTEMPTS
  // =========================================

  const {
    data: attempts = [],
    isLoading,
    isError,
  } = useQuery<ExamAttempt[], Error>({
    queryKey: ["admin-exam-attempts"],
    queryFn: fetchAttempts,
  });

  // =========================================
  // RELEASE RESULT
  // =========================================

  const releaseMutation = useMutation({
    mutationFn: releaseResult,

    onMutate: (attemptId) => {
      setReleasingAttemptId(attemptId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-exam-attempts"],
      });
    },

    onSettled: () => {
      setReleasingAttemptId(null);
    },
  });

  // =========================================
  // LOADING
  // =========================================

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-500">
          Loading exam submissions...
        </p>
      </div>
    );
  }

  // =========================================
  // ERROR
  // =========================================

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
        Failed to load exam submissions.
      </div>
    );
  }

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="space-y-6">
      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Exam Submissions
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Review submitted exams and release student results.
        </p>
      </div>

      {/* ===================================== */}
      {/* EMPTY STATE */}
      {/* ===================================== */}

      {attempts.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
          <BookOpen className="mx-auto h-12 w-12 text-gray-300" />

          <h2 className="mt-4 text-lg font-semibold text-gray-900">
            No exam submissions
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            There are no submitted exams yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {attempts.map((attempt) => {
            const isReleasing =
              releasingAttemptId === attempt.id;

            return (
              <div
                key={attempt.id}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >
                {/* ================================= */}
                {/* TOP */}
                {/* ================================= */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  {/* Student */}

                  <div>
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-gray-400" />

                      <h2 className="font-semibold text-gray-900">
                        Student: {attempt.student}
                      </h2>
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      Exam ID: {attempt.exam}
                    </p>
                  </div>

                  {/* Release Status */}

                  {attempt.result_released ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                      <CheckCircle size={16} />
                      Released
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-1 text-sm font-medium text-yellow-700">
                      <Clock size={16} />
                      Not Released
                    </span>
                  )}
                </div>

                {/* ================================= */}
                {/* INFORMATION */}
                {/* ================================= */}

                <div className="mt-6 grid grid-cols-1 gap-4 border-y py-5 sm:grid-cols-3">
                  {/* Score */}

                  <div>
                    <p className="text-xs text-gray-500">
                      Score
                    </p>

                    <p className="mt-1 text-lg font-bold text-gray-900">
                      {attempt.score}%
                    </p>
                  </div>

                  {/* Result */}

                  <div>
                    <p className="text-xs text-gray-500">
                      Result
                    </p>

                    <p
                      className={`mt-1 font-semibold ${
                        attempt.passed
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {attempt.passed
                        ? "Passed"
                        : "Failed"}
                    </p>
                  </div>

                  {/* Submitted */}

                  <div>
                    <p className="text-xs text-gray-500">
                      Submitted
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {attempt.submitted_at
                        ? new Date(
                            attempt.submitted_at
                          ).toLocaleString()
                        : "Not available"}
                    </p>
                  </div>
                </div>

                {/* ================================= */}
                {/* RELEASE BUTTON */}
                {/* ================================= */}

                {!attempt.result_released && (
                  <button
                    type="button"
                    onClick={() =>
                      releaseMutation.mutate(
                        attempt.id
                      )
                    }
                    disabled={isReleasing}
                    className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isReleasing
                      ? "Releasing..."
                      : "Release Result"}
                  </button>
                )}

                {/* ================================= */}
                {/* ALREADY RELEASED */}
                {/* ================================= */}

                {attempt.result_released && (
                  <div className="mt-5 rounded-xl bg-green-50 p-4 text-center text-sm font-medium text-green-700">
                    This result has already been released
                    to the student.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================= */}
      {/* RELEASE ERROR */}
      {/* ========================================= */}

      {releaseMutation.isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          Failed to release result. Please try again.
        </div>
      )}
    </div>
  );
}