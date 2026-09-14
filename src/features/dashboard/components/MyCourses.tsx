import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface Enrollment {
  id: string;
  course: string;
  course_title: string;
  progress: number;
  status: "ACTIVE" | "COMPLETED" | "DROPPED";
}

interface Props {
  enrollments: Enrollment[];
}

export default function MyCourses({
  enrollments,
}: Props) {
  return (
    <section>
      {/* =========================
          Section Header
      ========================= */}

      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            My Courses
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Courses you're currently learning.
          </p>
        </div>

        <Link
          to="/courses"
          className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          View All
        </Link>
      </div>

      {/* =========================
          Empty State
      ========================= */}

      {enrollments.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <BookOpen size={22} />
          </div>

          <h3 className="mt-4 font-semibold text-gray-900">
            No courses yet
          </h3>

          <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
            You haven't enrolled in any courses yet.
            Explore our courses and start learning today.
          </p>

          <Link
            to="/courses"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Explore Courses

            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        /* =========================
           Course Cards
        ========================= */

        <div className="grid gap-4 sm:grid-cols-2">
          {enrollments.map((course) => {
            const progress = Math.min(
              Math.max(course.progress, 0),
              100,
            );

            const isCompleted =
              course.status === "COMPLETED";

            return (
              <article
                key={course.id}
                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Course icon + status */}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <BookOpen size={21} />
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      isCompleted
                        ? "bg-green-50 text-green-700"
                        : course.status === "DROPPED"
                          ? "bg-red-50 text-red-700"
                          : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {isCompleted
                      ? "Completed"
                      : course.status === "DROPPED"
                        ? "Dropped"
                        : "In Progress"}
                  </span>
                </div>

                {/* Course title */}

                <h3 className="mt-5 line-clamp-2 text-lg font-bold text-gray-900">
                  {course.course_title}
                </h3>

                {/* Progress */}

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">
                      Progress
                    </span>

                    <span className="text-sm font-bold text-gray-900">
                      {progress}%
                    </span>
                  </div>

                  <div
                    className="h-2 overflow-hidden rounded-full bg-gray-100"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${course.course_title} progress`}
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted
                          ? "bg-green-500"
                          : "bg-blue-600"
                      }`}
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Action */}

                <Link
                  to={`/courses/${course.course}/learn`}
                  className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-sm font-semibold text-blue-600 transition group-hover:text-blue-700"
                >
                  <span>
                    {isCompleted
                      ? "Review Course"
                      : "Continue Learning"}
                  </span>

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}