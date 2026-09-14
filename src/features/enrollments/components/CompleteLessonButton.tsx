import { CheckCircle, Loader2 } from "lucide-react";

import { useCompleteLesson } from "../hooks/useCompleteLesson";

interface Props {
  lessonId: string;
}

export default function CompleteLessonButton({
  lessonId,
}: Props) {
  const mutation = useCompleteLesson();

  function handleComplete() {
    mutation.mutate(lessonId);
  }

  return (
    <button
      type="button"
      onClick={handleComplete}
      disabled={mutation.isPending}
      className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {mutation.isPending ? (
        <>
          <Loader2
            size={20}
            className="animate-spin"
          />

          Saving...
        </>
      ) : (
        <>
          <CheckCircle size={20} />

          Mark Lesson as Complete
        </>
      )}
    </button>
  );
}