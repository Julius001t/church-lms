import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import CourseCard from "@/features/courses/components/CourseCard";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export default function FeaturedCourses() {
  const access = useAuthStore(
    (state) => state.access,
  );

  const isAuthenticated = !!access;

  const {
    data,
    isLoading,
    isError,
  } = useCourses();

  const courses = data?.results ?? [];

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Featured Courses
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Start learning today
            </h2>

            <p className="mt-3 max-w-2xl text-gray-600">
              Explore our courses and discover lessons that
              will help you grow in your faith and understanding.
            </p>
          </div>

          {/* Only show View All Courses to authenticated users */}
          {isAuthenticated && (
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
            >
              View all courses
              <ArrowRight size={18} />
            </Link>
          )}
        </div>

        {/* =====================================================
            LOGGED OUT
        ===================================================== */}

        {!isAuthenticated && (
          <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto max-w-2xl">

              <h3 className="text-2xl font-bold text-gray-900">
                Ready to start learning?
              </h3>

              <p className="mt-3 text-gray-600">
                Sign in to explore our courses, lessons,
                exams, and certificates.
              </p>

              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">

                <Link
                  to="/login"
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Create Account
                </Link>

              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            LOGGED IN
        ===================================================== */}

        {isAuthenticated && (
          <>
            {/* Loading */}
            {isLoading && (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-80 animate-pulse rounded-xl bg-white shadow-sm"
                  />
                ))}
              </div>
            )}

            {/* API Error */}
            {isError && (
              <div className="mt-10 rounded-2xl bg-red-50 p-8 text-center">
                <p className="font-semibold text-red-700">
                  Unable to load courses.
                </p>

                <p className="mt-2 text-sm text-red-600">
                  Please try again later.
                </p>
              </div>
            )}

            {/* Empty */}
            {!isLoading &&
              !isError &&
              courses.length === 0 && (
                <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900">
                    No courses available yet.
                  </h3>

                  <p className="mt-2 text-gray-500">
                    New courses will appear here when they
                    become available.
                  </p>

                  <Link
                    to="/courses"
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Browse courses
                    <ArrowRight size={18} />
                  </Link>
                </div>
              )}

            {/* Courses */}
            {!isLoading &&
              !isError &&
              courses.length > 0 && (
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {courses.slice(0, 6).map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                    />
                  ))}
                </div>
              )}
          </>
        )}

      </div>
    </section>
  );
}