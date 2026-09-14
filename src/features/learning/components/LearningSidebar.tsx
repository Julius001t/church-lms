import ModuleAccordion from "./ModuleAccordion";

import type {
  Lesson,
  Module,
} from "../types/learning";

interface Props {
  modules: Module[];
  selectedLesson: Lesson | null;
  onSelectLesson: (lesson: Lesson) => void;
}

export default function LearningSidebar({
  modules,
  selectedLesson,
  onSelectLesson,
}: Props) {
  const totalLessons = modules.reduce(
    (total, module) =>
      total + module.lessons.length,
    0
  );

  const completedLessons = modules.reduce(
    (total, module) =>
      total +
      module.lessons.filter(
        (lesson) => lesson.completed
      ).length,
    0
  );

  const progress =
    totalLessons > 0
      ? Math.round(
          (completedLessons / totalLessons) * 100
        )
      : 0;

  return (
    <aside className="w-80 shrink-0 border-r bg-white">
      {/* Header */}
      <div className="border-b p-6">
        <h2 className="text-xl font-bold text-gray-900">
          Course Content
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Continue where you left off.
        </p>

        {/* Progress */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm font-medium">
            <span>Course Progress</span>

            <span>{progress}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <p className="mt-2 text-xs text-gray-500">
            {completedLessons} of {totalLessons} lessons
            completed
          </p>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-4 p-4">
        {modules.length > 0 ? (
          modules.map((module) => (
            <ModuleAccordion
              key={module.id}
              module={module}
              selectedLesson={selectedLesson}
              onSelectLesson={onSelectLesson}
            />
          ))
        ) : (
          <p className="py-8 text-center text-sm text-gray-500">
            No lessons available yet.
          </p>
        )}
      </div>
    </aside>
  );
}