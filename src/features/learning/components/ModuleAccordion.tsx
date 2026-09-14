import { useState } from "react";

import {
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import LessonItem from "./LessonItem";

import type {
  Lesson,
  Module,
} from "../types/learning";

interface Props {
  module: Module;
  selectedLesson: Lesson | null;
  onSelectLesson: (lesson: Lesson) => void;
}

export default function ModuleAccordion({
  module,
  selectedLesson,
  onSelectLesson,
}: Props) {
  const [open, setOpen] = useState(true);

  const completedLessons = module.lessons.filter(
    (lesson) => lesson.completed
  ).length;

  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4"
      >
        <div className="text-left">
          <h3 className="font-semibold">
            {module.title}
          </h3>

          <p className="text-sm text-gray-500">
            {completedLessons} /{" "}
            {module.lessons.length} Lessons Completed
          </p>
        </div>

        {open ? (
          <ChevronDown size={20} />
        ) : (
          <ChevronRight size={20} />
        )}
      </button>

      {open && (
        <div className="space-y-2 border-t p-3">
          {module.lessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              isSelected={
                selectedLesson?.id === lesson.id
              }
              onClick={() =>
                onSelectLesson(lesson)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}