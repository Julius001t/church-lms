import { CheckCircle2 } from "lucide-react";

interface LessonProgress {
  id: string;
  lesson_title: string;
  course_title: string;
  completed: boolean;
  completed_at: string | null;
}

interface Props {
  lessonProgress: LessonProgress[];
}

export default function RecentActivity({
  lessonProgress,
}: Props) {
  const completedLessons = lessonProgress
    .filter((lesson) => lesson.completed)
    .slice(0, 5);

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Recent Activity
      </h2>

      {completedLessons.length === 0 ? (
        <p className="text-gray-500">
          No learning activity yet.
        </p>
      ) : (
        <div className="space-y-5">
          {completedLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex items-start gap-4"
            >
              <div className="rounded-full bg-green-100 p-2">
                <CheckCircle2
                  className="text-green-600"
                  size={18}
                />
              </div>

              <div>
                <p className="font-semibold">
                  {lesson.lesson_title}
                </p>

                <p className="text-sm text-gray-500">
                  {lesson.course_title}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {lesson.completed_at
                    ? new Date(
                        lesson.completed_at
                      ).toLocaleDateString()
                    : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}