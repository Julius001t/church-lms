import { Link, useParams } from "react-router-dom";

import { useCourse } from "../hooks/useCourse";

import CourseHero from "../components/CourseHero";
import ModuleAccordion from "../components/ModuleAccordion";

import EnrollButton from "@/features/enrollments/components/EnrollButton";
import { useEnrollments } from "@/features/enrollments/hooks/useEnrollments";

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: course,
    isLoading: courseLoading,
    isError: courseError,
  } = useCourse(id ?? "");

  const {
    data: enrollments = [],
    isLoading: enrollmentsLoading,
  } = useEnrollments();

  if (courseLoading || enrollmentsLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">
          Loading course...
        </p>
      </div>
    );
  }

  if (courseError || !course) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">
          Course not found.
        </p>
      </div>
    );
  }

  const isEnrolled = enrollments.some(
    (enrollment) =>
      enrollment.course === course.id &&
      (
        enrollment.status === "ACTIVE" ||
        enrollment.status === "COMPLETED"
      )
  );

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">

      {/* Course Hero */}
      <CourseHero course={course} />

      {/* Enrollment */}
      <div className="rounded-xl border bg-white p-6">
        {isEnrolled ? (
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                You are enrolled
              </h2>

              <p className="mt-1 text-gray-500">
                You can now access the lessons.
              </p>
            </div>

            <Link
              to={`/courses/${course.id}/learn`}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Start Learning
            </Link>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Ready to start learning?
            </h2>

            <p className="mt-1 text-gray-500">
              Enroll in this course before you start the lessons.
            </p>

            <div className="mt-4">
              <EnrollButton
                courseId={course.id}
                isEnrolled={isEnrolled}
              />
            </div>
          </div>
        )}
      </div>

      {/* Course Content */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Course Content
        </h2>

        {course.modules.length > 0 ? (
          <div className="space-y-5">
            {course.modules.map((module) => (
              <ModuleAccordion
                key={module.id}
                module={module}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
            No modules have been added to this course yet.
          </div>
        )}
      </section>
    </div>
  );
}