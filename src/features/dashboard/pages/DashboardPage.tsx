import DashboardHero from "../components/DashboardHero";
import ContinueLearningCard from "../components/ContinueLearningCard";
import DashboardStats from "../components/DashboardStats";
import MyCourses from "../components/MyCourses";
import RecentActivity from "../components/RecentActivity";
import UpcomingExams from "../components/UpcomingExams";
import RecentCertificates from "../components/RecentCertificates";

import { useDashboard } from "../hooks/useDashboard";

export default function DashboardPage() {
  const {
    data,
    isLoading,
    isError,
  } = useDashboard();

  // =========================
  // Loading
  // =========================

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-sm font-medium text-gray-500">
          Loading your dashboard...
        </div>
      </div>
    );
  }

  // =========================
  // Error
  // =========================

  if (isError || !data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-sm font-medium text-red-600">
          Failed to load dashboard.
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">

        {/* =========================
            Welcome
        ========================= */}

        <DashboardHero
          studentName={data.student_name}
          studentEmail={data.student_email}
        />

        {/* =========================
            Continue Learning
        ========================= */}

        {data.continue_learning && (
          <section>
            <ContinueLearningCard
              courseId={data.continue_learning.course_id}
              courseTitle={data.continue_learning.course_title}
              moduleId={data.continue_learning.module_id}
              moduleTitle={data.continue_learning.module_title}
              lessonId={data.continue_learning.lesson_id}
              lessonTitle={data.continue_learning.lesson_title}
              progress={data.continue_learning.progress}
            />
          </section>
        )}

        {/* =========================
            Learning Statistics
        ========================= */}

        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Your Learning Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Track your progress and learning achievements.
            </p>
          </div>

          <DashboardStats data={data} />
        </section>

        {/* =========================
            Main Dashboard
        ========================= */}

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* =========================
              Main Column
          ========================= */}

          <div className="space-y-8 lg:col-span-2">

            {/* My Courses */}

            <section>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  My Courses
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Continue learning from your enrolled courses.
                </p>
              </div>

              <MyCourses
                enrollments={data.enrollments}
              />
            </section>

            {/* Upcoming Exams */}

            <section>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Upcoming Exams
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Exams and assessments waiting for you.
                </p>
              </div>

              <UpcomingExams
                examAttempts={data.exam_attempts}
              />
            </section>
          </div>

          {/* =========================
              Sidebar
          ========================= */}

          <aside className="space-y-8">

            {/* Recent Activity */}

            <section>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Recent Activity
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your latest learning activity.
                </p>
              </div>

              <RecentActivity
                lessonProgress={data.lesson_progress}
              />
            </section>

            {/* Certificates */}

            <section>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Certificates
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your recently earned certificates.
                </p>
              </div>

              <RecentCertificates
                certificates={data.certificates}
              />
            </section>

          </aside>
        </section>
      </div>
    </main>
  );
}