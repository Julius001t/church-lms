import {
  CheckCircle,
  ArrowLeft,
  Clock,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

interface ExamResultState {
  attemptId: string;
  examTitle: string;
}

export default function ExamResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const state =
    location.state as ExamResultState | null;

  // =========================================
  // RESULT DATA NOT FOUND
  // =========================================

  if (!state) {
    return (
      <div className="flex min-h-[500px] items-center justify-center p-6">
        <div className="text-center">

          <h1 className="text-xl font-bold text-gray-900">
            Submission information not found
          </h1>

          <p className="mt-2 text-gray-500">
            We could not find your exam submission.
          </p>

          <button
            type="button"
            onClick={() => navigate("/exams")}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Exams
          </button>

        </div>
      </div>
    );
  }

  // =========================================
  // SUBMITTED
  // =========================================

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6">

      {/* Success Header */}

      <div className="text-center">

        <CheckCircle className="mx-auto h-20 w-20 text-green-500" />

        <h1 className="mt-5 text-3xl font-bold text-gray-900">
          Exam Submitted Successfully
        </h1>

        <p className="mt-2 text-gray-500">
          {state.examTitle}
        </p>

      </div>

      {/* Submission Information */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="flex items-start gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>

          <div>

            <h2 className="font-semibold text-gray-900">
              Your exam has been submitted
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Your answers have been recorded successfully.
              Your result will be available when it has been
              released by the administrator.
            </p>

          </div>

        </div>

      </div>

      {/* Notice */}

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">

        <p className="text-sm leading-6 text-blue-800">
          Your score and pass status are not available yet.
          Please check your dashboard or notifications later
          to see when your result has been released.
        </p>

      </div>

      {/* Actions */}

      <div className="flex justify-center">

        <button
          type="button"
          onClick={() => navigate("/exams")}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <ArrowLeft size={18} />

          Back to Exams
        </button>

      </div>

    </div>
  );
}