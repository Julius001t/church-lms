import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  score: number;
  passed: boolean;
  passMark: number;
}

export default function ScoreCard({
  score,
  passed,
  passMark,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-50 bg-white p-8 text-center shadow-sm">
      {/* Status Icon */}
      <div className="flex justify-center">
        {passed ? (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
        )}
      </div>

      {/* Title */}
      <h2 className="mt-5 text-2xl font-bold text-gray-900">
        {passed ? "Congratulations!" : "Exam Not Passed"}
      </h2>

      {/* Message */}
      <p className="mt-2 text-gray-500">
        {passed
          ? "You have successfully passed this exam."
          : "You did not reach the required pass mark."}
      </p>

      {/* Score */}
      <div className="mt-8">
        <p className="text-sm font-medium text-gray-500">
          Your Score
        </p>

        <p
          className={`mt-2 text-5xl font-bold ${
            passed
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {score}%
        </p>
      </div>

      {/* Pass Mark */}
      <div className="mt-6 rounded-xl bg-gray-50 p-4">
        <p className="text-sm text-gray-500">
          Required Pass Mark
        </p>

        <p className="mt-1 text-lg font-semibold text-gray-900">
          {passMark}%
        </p>
      </div>
    </div>
  );
}