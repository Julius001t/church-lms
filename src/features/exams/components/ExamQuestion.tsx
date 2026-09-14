import type { Question } from "../types/exam";

interface Props {
  question: Question;
  questionNumber: number;
  selectedChoice: string | undefined;
  onSelect: (choiceId: string) => void;
}

export default function ExamQuestion({
  question,
  questionNumber,
  selectedChoice,
  onSelect,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      {/* Question number */}
      <p className="text-sm font-medium text-blue-600">
        Question {questionNumber}
      </p>

      {/* Question */}
      <h2 className="mt-3 text-xl font-semibold leading-8 text-gray-900">
        {question.question}
      </h2>

      {/* Choices */}
      <div className="mt-8 space-y-3">
        {question.choices.map((choice) => {
          const isSelected =
            selectedChoice === choice.id;

          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => onSelect(choice.id)}
              className={`w-full rounded-xl border p-4 text-left transition ${
                isSelected
                  ? "border-blue-600 bg-blue-50 text-blue-900"
                  : "border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Radio indicator */}
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? "border-blue-600"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                  )}
                </span>

                <span>{choice.text}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}