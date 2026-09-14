import { useParams } from "react-router-dom";

import { useExamReview } from "../hooks/useExamReview";

export default function ExamReviewPage() {
  const { attemptId } = useParams<{
    attemptId: string;
  }>();

  const {
    data: review,
    isLoading,
    isError,
  } = useExamReview(attemptId ?? "");

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-500">
          Loading exam review...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-red-500">
          Failed to load exam review.
        </p>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-500">
          Exam review not found.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div>
        <p className="text-sm font-medium text-blue-600">
          {review.course_title}
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          {review.exam_title}
        </h1>

        <p className="mt-2 text-gray-500">
          {review.module_title}
        </p>
      </div>

      {/* =====================================================
          RESULT SUMMARY
      ===================================================== */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Exam Result
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {/* SCORE */}

          <div>
            <p className="text-sm text-gray-500">
              Score
            </p>

            <p className="mt-1 text-3xl font-bold text-gray-900">
              {review.score}%
            </p>
          </div>

          {/* RESULT */}

          <div>
            <p className="text-sm text-gray-500">
              Result
            </p>

            <p
              className={`mt-1 font-bold ${
                review.passed
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {review.passed
                ? "Passed"
                : "Failed"}
            </p>
          </div>

          {/* STATUS */}

          <div>
            <p className="text-sm text-gray-500">
              Status
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {review.status}
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          ANSWER REVIEW
      ===================================================== */}

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Answer Review
        </h2>

        <p className="text-sm text-gray-500">
          Review each question to see your answer,
          the correct answer, and all available choices.
        </p>

        {review.answers.map((answer, index) => {
          const isCorrect = answer.is_correct;

          return (
            <div
              key={answer.id}
              className={`rounded-2xl border bg-white p-6 shadow-sm ${
                isCorrect
                  ? "border-green-200"
                  : "border-red-200"
              }`}
            >
              {/* QUESTION HEADER */}

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-blue-600">
                    Question {index + 1}
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-gray-900">
                    {answer.question_text}
                  </h3>
                </div>

                {/* CORRECT / WRONG BADGE */}

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-sm font-semibold ${
                    isCorrect
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {isCorrect
                    ? "Correct"
                    : "Incorrect"}
                </span>
              </div>

              {/* ANSWER CHOICES */}

              <div className="mt-5 space-y-3">
                {answer.choices.map(
                  (choice, choiceIndex) => {
                    const isSelected =
                      choice.id ===
                      answer.selected_choice;

                    const isCorrectChoice =
                      choice.id ===
                      answer.correct_choice?.id;

                    let choiceStyle =
                      "border-gray-200 bg-white";

                    let textStyle =
                      "text-gray-700";

                    if (isCorrectChoice) {
                      choiceStyle =
                        "border-green-300 bg-green-50";

                      textStyle =
                        "text-green-800";
                    } else if (isSelected) {
                      choiceStyle =
                        "border-red-300 bg-red-50";

                      textStyle =
                        "text-red-800";
                    }

                    return (
                      <div
                        key={choice.id}
                        className={`flex items-center justify-between gap-4 rounded-xl border p-4 ${choiceStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          {/* A / B / C / D */}

                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-bold ${textStyle}`}
                          >
                            {String.fromCharCode(
                              65 + choiceIndex
                            )}
                          </span>

                          {/* ANSWER TEXT */}

                          <span
                            className={`font-medium ${textStyle}`}
                          >
                            {choice.text}
                          </span>
                        </div>

                        {/* STATUS */}

                        <div className="flex shrink-0 items-center gap-2 text-sm font-semibold">
                          {isCorrectChoice && (
                            <span className="text-green-600">
                              ✓ Correct answer
                            </span>
                          )}

                          {isSelected &&
                            !isCorrectChoice && (
                              <span className="text-red-600">
                                ✕ Your answer
                              </span>
                            )}

                          {isSelected &&
                            isCorrectChoice && (
                              <span className="text-green-600">
                                ✓ Your answer
                              </span>
                            )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              {/* NO ANSWER */}

              {!answer.selected_choice && (
                <div className="mt-4 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                  <p className="text-sm font-medium text-yellow-800">
                    You did not answer this question.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}