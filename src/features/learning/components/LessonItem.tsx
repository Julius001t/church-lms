import { CheckCircle, PlayCircle } from "lucide-react";

import type { Lesson } from "../types/learning";

interface Props {
  lesson: Lesson;
  isSelected: boolean;
  onClick: () => void;
}

export default function LessonItem({
  lesson,
  isSelected,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition
        ${
          isSelected
            ? "bg-blue-100 text-blue-700"
            : "hover:bg-gray-100"
        }`}
    >
      {lesson.completed ? (
        <CheckCircle
          size={18}
          className="text-green-600"
        />
      ) : (
        <PlayCircle
          size={18}
          className="text-gray-500"
        />
      )}

      <div className="flex-1">
        <p className="font-medium">
          {lesson.title}
        </p>

        <p className="text-xs text-gray-500">
          {lesson.lesson_type}
        </p>
      </div>
    </button>
  );
}