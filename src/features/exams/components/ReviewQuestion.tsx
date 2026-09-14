import type { ReviewAnswer } from "../types/exam";

interface Props {
  answer: ReviewAnswer;
}

export default function ReviewQuestion({
  answer,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold">
        {answer.question_text}
      </h2>

      <div className="mt-6 space-y-5">

        <div>
          <p className="text-sm text-gray-500">
            Your Answer
          </p>

          <p
            className={`font-medium ${
              answer.is_correct
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {answer.selected_choice_text}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Correct Answer
          </p>

          <p className="font-medium text-green-600">
            {answer.correct_choice?.text}
          </p>
        </div>

      </div>

    </div>
  );
}