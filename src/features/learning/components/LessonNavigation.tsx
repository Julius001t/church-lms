import type { Lesson } from "../types/learning";

interface Props {
  previousLesson: Lesson | null;
  nextLesson: Lesson | null;
  onSelectLesson: (lesson: Lesson) => void;
}

export default function LessonNavigation({
  previousLesson,
  nextLesson,
  onSelectLesson,
}: Props) {
  return (
    <div className="flex items-center justify-between border-t px-8 py-5">
      <button
        disabled={!previousLesson}
        onClick={() =>
          previousLesson &&
          onSelectLesson(previousLesson)
        }
        className="rounded-lg border px-5 py-3 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← Previous Lesson
      </button>

      <button
        disabled={!nextLesson}
        onClick={() =>
          nextLesson &&
          onSelectLesson(nextLesson)
        }
        className="rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        Next Lesson →
      </button>
    </div>
  );
}