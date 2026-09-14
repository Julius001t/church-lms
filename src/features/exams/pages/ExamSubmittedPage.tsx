import { CheckCircle, ArrowLeft } from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

export default function ExamSubmittedPage() {
  const navigate = useNavigate();

  const { attemptId } = useParams<{
    attemptId: string;
  }>();

  return (
    <div className="mx-auto flex min-h-[500px] max-w-2xl items-center justify-center p-6">
      <div className="w-full rounded-2xl border bg-white p-8 text-center shadow-sm sm:p-10">

        {/* Success Icon */}
        <CheckCircle className="mx-auto h-20 w-20 text-green-500" />

        {/* Title */}
        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Exam Submitted Successfully
        </h1>

        {/* Message */}
        <p className="mx-auto mt-4 max-w-md leading-7 text-gray-500">
          Your exam has been submitted successfully.
          Your result will be available when it has
          been released.
        </p>

        {/* Important Notice */}
        <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
          Your score is not available yet. Please wait
          for your result to be released.
        </div>

        {/* Attempt ID */}
        {attemptId && (
          <div className="mt-5 rounded-xl bg-gray-50 p-4">
            <p className="text-xs font-medium text-gray-500">
              Attempt ID
            </p>

            <p className="mt-1 break-all text-sm font-medium text-gray-700">
              {attemptId}
            </p>
          </div>
        )}

        {/* Back to Exams */}
        <button
          type="button"
          onClick={() => navigate("/exams")}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <ArrowLeft size={18} />

          Back to Exams
        </button>
      </div>
    </div>
  );
}