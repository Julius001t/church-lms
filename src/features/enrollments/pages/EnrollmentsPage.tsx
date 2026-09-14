import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

import { useEnrollments } from "../hooks/useEnrollments";

export default function EnrollmentsPage() {
  const {
    data: enrollments = [],
    isLoading,
    isError,
    error,
  } = useEnrollments();

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-gray-500">
            Loading your enrollments...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-700">
            Unable to load enrollments
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error instanceof Error
              ? error.message
              : "Something went wrong."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          My Enrollments
        </h1>

        <p className="mt-2 text-gray-500">
          View the courses you are currently enrolled in.
        </p>
      </div>

      {enrollments.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center">
          <BookOpen
            size={48}
            className="mx-auto text-gray-400"
          />

          <h2 className="mt-4 text-xl font-semibold">
            No enrollments yet
          </h2>

          <p className="mt-2 text-gray-500">
            Browse our courses and enroll in one to start learning.
          </p>

          <Link
            to="/courses"
            className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enrollments.map((enrollment) => (
            <div
              key={enrollment.id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-bold">
                {enrollment.course_title}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Status: {enrollment.status}
              </p>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-sm">
                  <span>Progress</span>

                  <span className="font-semibold">
                    {enrollment.progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${Math.min(
                        Math.max(enrollment.progress, 0),
                        100,
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <Link
                to={`/courses/${enrollment.course}/learn`}
                className="mt-6 block rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white hover:bg-blue-700"
              >
                Continue Learning
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}