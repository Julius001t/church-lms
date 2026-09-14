import { Link } from "react-router-dom";

import ExamCard from "../components/ExamCard";
import { useExams } from "../hooks/useExams";
import { useExamAttempts } from "../hooks/useExamAttempts";

export default function ExamsPage() {
  const {
    data: exams,
    isLoading: examsLoading,
    isError: examsError,
  } = useExams();

  const {
    data: attempts,
    isLoading: attemptsLoading,
    isError: attemptsError,
  } = useExamAttempts();

  // =========================================
  // LOADING
  // =========================================

  if (examsLoading || attemptsLoading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">
          Loading exams...
        </p>
      </div>
    );
  }

  // =========================================
  // ERROR
  // =========================================

  if (examsError || attemptsError) {
    return (
      <div className="p-6">
        <p className="text-red-500">
          Failed to load exams.
        </p>
      </div>
    );
  }

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="space-y-8 p-6">
      {/* ===================================== */}
      {/* PAGE HEADER */}
      {/* ===================================== */}

      <div>
        <h1 className="text-3xl font-bold">
          Exams
        </h1>

        <p className="mt-2 text-gray-500">
          Complete your assessments and track your progress.
        </p>
      </div>

      {/* ===================================== */}
      {/* EXAMS */}
      {/* ===================================== */}

      {exams && exams.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {exams.map((exam) => {
            // Find this student's attempt for this exam
            const attempt = attempts?.find(
              (item) => item.exam === exam.id
            );

            return (
              <div key={exam.id} className="space-y-3">
                {/* Exam card */}
                <ExamCard exam={exam} />

                {/* ================================= */}
                {/* EXAM STATUS */}
                {/* ================================= */}

                {attempt && (
                  <div className="rounded-xl border bg-white p-4 shadow-sm">
                    {/* Submitted but result NOT released */}
                    {!attempt.result_released ? (
                      <div>
                        <p className="font-semibold text-gray-900">
                          Exam submitted
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Your result is waiting to be released by the
                          administrator.
                        </p>

                        <div className="mt-3 inline-flex rounded-lg bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-700">
                          Result pending
                        </div>
                      </div>
                    ) : (
                      /* Result released */
                      <div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">
                              Result released
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                              Your examination result is now available.
                            </p>
                          </div>

                          <div
                            className={`rounded-lg px-3 py-2 text-sm font-bold ${
                              attempt.passed
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {attempt.passed
                              ? "Passed"
                              : "Failed"}
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t pt-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Score
                            </p>

                            <p className="text-2xl font-bold text-gray-900">
                              {attempt.score}%
                            </p>
                          </div>

                          <Link
                            to={`/exams/results/${attempt.id}`}
                            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                          >
                            View Result
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
          No exams are available yet.
        </div>
      )}
    </div>
  );
}