import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  score: number;
  passMark: number;
  passed: boolean;
}

export default function ResultCard({
  score,
  passMark,
  passed,
}: Props) {
  return (
    <div
      className={`rounded-2xl border p-6 shadow-sm sm:p-8 ${
        passed
          ? "border-green-200 bg-green-50"
          : "border-red-200 bg-red-50"
      }`}
    >
      {/* Status */}

      <div className="flex flex-col items-center text-center">
        {passed ? (
          <CheckCircle className="h-12 w-12 text-green-600" />
        ) : (
          <XCircle className="h-12 w-12 text-red-600" />
        )}

        <h2
          className={`mt-4 text-xl font-bold ${
            passed
              ? "text-green-800"
              : "text-red-800"
          }`}
        >
          {passed ? "You Passed!" : "You Did Not Pass"}
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          {passed
            ? "Great job! You have successfully passed this exam."
            : "Keep learning and try again when you are ready."}
        </p>
      </div>

      {/* Score */}

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-white p-5 text-center">
          <p className="text-sm text-gray-500">
            Your Score
          </p>

          <p
            className={`mt-2 text-3xl font-bold ${
              passed
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {score}%
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 text-center">
          <p className="text-sm text-gray-500">
            Pass Mark
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {passMark}%
          </p>
        </div>
      </div>

      {/* Progress */}

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-600">
            Score
          </span>

          <span className="font-semibold text-gray-900">
            {score}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full transition-all ${
              passed
                ? "bg-green-500"
                : "bg-red-500"
            }`}
            style={{
              width: `${Math.min(score, 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Pass mark explanation */}

      <div className="mt-6 rounded-xl bg-white p-4 text-center text-sm text-gray-600">
        {passed ? (
          <>
            You scored{" "}
            <strong className="text-gray-900">
              {score}%
            </strong>{" "}
            which is above the required pass mark of{" "}
            <strong className="text-gray-900">
              {passMark}%
            </strong>
            .
          </>
        ) : (
          <>
            You scored{" "}
            <strong className="text-gray-900">
              {score}%
            </strong>
            . You need at least{" "}
            <strong className="text-gray-900">
              {passMark}%
            </strong>{" "}
            to pass.
          </>
        )}
      </div>
    </div>
  );
}