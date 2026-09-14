import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  ClipboardCheck,
} from "lucide-react";

import api from "../../../lib/api";

interface StudentResult {
  id: string;
  exam: string;
  exam_title: string;
  module_title: string;
  course_title: string;
  score: number;
  passed: boolean;
  status: string;
  submitted_at: string;
}

async function fetchStudentResult(
  attemptId: string
): Promise<StudentResult> {
  const response = await api.get<StudentResult>(
    `/exams/results/${attemptId}/`
  );

  return response.data;
}

export default function StudentResultPage() {
  const { attemptId } = useParams<{
    attemptId: string;
  }>();

  const navigate = useNavigate();

  const {
    data: result,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["student-result", attemptId],
    queryFn: () =>
      fetchStudentResult(attemptId ?? ""),
    enabled: Boolean(attemptId),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-500">
          Loading result...
        </p>
      </div>
    );
  }

  if (isError || !result) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center p-6">
        <p className="text-red-500">
          Failed to load result.
        </p>

        <button
          type="button"
          onClick={() => navigate("/exams")}
          className="mt-4 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Back to Exams
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-blue-600">
          {result.course_title}
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          {result.exam_title}
        </h1>

        <p className="mt-2 text-gray-500">
          {result.module_title}
        </p>
      </div>

      {/* =====================================================
          RESULT
      ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        {result.passed ? (
          <CheckCircle className="mx-auto h-20 w-20 text-green-500" />
        ) : (
          <XCircle className="mx-auto h-20 w-20 text-red-500" />
        )}

        <h2 className="mt-5 text-2xl font-bold text-gray-900">
          {result.passed
            ? "Congratulations!"
            : "Exam Not Passed"}
        </h2>

        <p className="mt-2 text-gray-500">
          Your result has been released.
        </p>

        {/* =================================================
            SCORE
        ================================================= */}

        <div className="mt-8 rounded-2xl bg-gray-50 p-6">
          <p className="text-sm text-gray-500">
            Your Score
          </p>

          <p className="mt-2 text-5xl font-bold text-blue-600">
            {result.score}%
          </p>
        </div>

        {/* =================================================
            STATUS
        ================================================= */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-100 p-4">
            <p className="text-sm text-gray-500">
              Status
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {result.status}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 p-4">
            <p className="text-sm text-gray-500">
              Result
            </p>

            <p
              className={`mt-1 font-semibold ${
                result.passed
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {result.passed
                ? "Passed"
                : "Failed"}
            </p>
          </div>
        </div>

        {/* =================================================
            REVIEW ANSWERS
        ================================================= */}

        <button
          type="button"
          onClick={() =>
            navigate(
              `/exams/review/${attemptId}`
            )
          }
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          <ClipboardCheck size={18} />
          Review Answers
        </button>

        {/* =================================================
            BACK TO EXAMS
        ================================================= */}

        <button
          type="button"
          onClick={() => navigate("/exams")}
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <ArrowLeft size={18} />
          Back to Exams
        </button>
      </div>
    </div>
  );
}