import { ArrowLeft, ArrowRight, Send } from "lucide-react";

interface Props {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: number;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export default function QuestionNavigation({
  currentQuestion,
  totalQuestions,
  answeredQuestions,
  isSubmitting,
  onPrevious,
  onNext,
  onSubmit,
}: Props) {
  const isFirstQuestion = currentQuestion === 0;

  const isLastQuestion =
    currentQuestion === totalQuestions - 1;

  const allQuestionsAnswered =
    answeredQuestions === totalQuestions;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Previous */}
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className="flex items-center justify-center gap-2 rounded-xl border px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ArrowLeft size={18} />

        Previous
      </button>

      {/* Question Progress */}
      <p className="text-center text-sm text-gray-500">
        {answeredQuestions} of {totalQuestions} answered
      </p>

      {/* Next / Submit */}
      {isLastQuestion ? (
        <button
          type="button"
          onClick={onSubmit}
          disabled={
            isSubmitting ||
            !allQuestionsAnswered
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={18} />

          {isSubmitting
            ? "Submitting..."
            : "Submit Exam"}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Next

          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
}