import { BookOpen, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  courseId: string;
  courseTitle: string;
  moduleId: string;
  moduleTitle: string;
  lessonId: string;
  lessonTitle: string;
  progress: number;
}

export default function ContinueLearningCard({
  courseId,
  courseTitle,
  moduleId,
  moduleTitle,
  lessonId,
  lessonTitle,
  progress,
}: Props) {
  const navigate = useNavigate();

  const safeProgress = Math.min(
    Math.max(progress, 0),
    100,
  );

  function handleContinue() {
    navigate(
      `/courses/${courseId}/learn?module=${moduleId}&lesson=${lessonId}`,
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          {/* =========================
              Course Information
          ========================= */}

          <div className="min-w-0 flex-1">

            {/* Label */}
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <BookOpen size={19} />
              </div>

              <span className="text-sm font-semibold text-blue-600">
                Continue Learning
              </span>
            </div>

            {/* Course title */}
            <h2 className="mt-4 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              {courseTitle}
            </h2>

            {/* Current lesson */}
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-700">
                {moduleTitle}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Current lesson: {lessonTitle}
              </p>
            </div>

            {/* =========================
                Progress
            ========================= */}

            <div className="mt-6 max-w-2xl">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">
                  Course progress
                </span>

                <span className="text-sm font-bold text-gray-900">
                  {safeProgress}%
                </span>
              </div>

              <div
                className="h-2.5 overflow-hidden rounded-full bg-gray-100"
                role="progressbar"
                aria-valuenow={safeProgress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Course progress"
              >
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-500"
                  style={{
                    width: `${safeProgress}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* =========================
              Continue Button
          ========================= */}

          <div className="shrink-0">
            <button
              type="button"
              onClick={handleContinue}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:w-auto"
            >
              <PlayCircle size={19} />

              Continue Learning
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}