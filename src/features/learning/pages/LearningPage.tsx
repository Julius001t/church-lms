import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import LearningSidebar from "../components/LearningSidebar";
import LessonViewer from "../components/LessonViewer";

import { useModules } from "../hooks/useModules";

import { useEnrollments } from "@/features/enrollments/hooks/useEnrollments";

import type { Lesson } from "../types/learning";

export default function LearningPage() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const {
    data: modules = [],
    isLoading: modulesLoading,
    isError: modulesError,
  } = useModules(id ?? "");

  const {
    data: enrollments = [],
    isLoading: enrollmentsLoading,
    isError: enrollmentsError,
  } = useEnrollments();

  const [selectedLesson, setSelectedLesson] =
    useState<Lesson | null>(null);

  /*
   * Check whether the student is enrolled
   * in this particular course.
   */
  const isEnrolled = enrollments.some(
    (enrollment) =>
      enrollment.course === id &&
      (
        enrollment.status === "ACTIVE" ||
        enrollment.status === "COMPLETED"
      )
  );

  /*
   * Get all lessons from all modules.
   */
  const allLessons = useMemo(() => {
    return modules.flatMap(
      (module) => module.lessons
    );
  }, [modules]);

  /*
   * Select the first lesson after enrollment.
   */
  useEffect(() => {
    if (
      isEnrolled &&
      !selectedLesson &&
      allLessons.length > 0
    ) {
      setSelectedLesson(allLessons[0]);
    }
  }, [
    isEnrolled,
    allLessons,
    selectedLesson,
  ]);

  /*
   * Loading state.
   */
  if (
    modulesLoading ||
    enrollmentsLoading
  ) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-gray-500">
          Loading course...
        </p>
      </div>
    );
  }

  /*
   * Error state.
   */
  if (
    modulesError ||
    enrollmentsError
  ) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Unable to load course
          </h1>

          <p className="mt-2 text-gray-500">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  /*
   * Student has not enrolled.
   */
  if (!isEnrolled) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="w-full max-w-xl rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
            🔒
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Enrollment Required
          </h1>

          <p className="mt-3 text-gray-500">
            You must enroll in this course before
            you can access the lessons.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(`/courses/${id}`)
            }
            className="mt-6 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Go to Course & Enroll
          </button>
        </div>
      </div>
    );
  }

  /*
   * Find the current lesson.
   */
  const currentIndex =
    allLessons.findIndex(
      (lesson) =>
        lesson.id === selectedLesson?.id
    );

  const previousLesson =
    currentIndex > 0
      ? allLessons[currentIndex - 1]
      : null;

  const nextLesson =
    currentIndex >= 0 &&
    currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;

  /*
   * Student is enrolled.
   */
  return (
    <div className="flex h-full min-h-[calc(100vh-80px)] bg-gray-50">
      {/* Sidebar */}
      <LearningSidebar
        modules={modules}
        selectedLesson={selectedLesson}
        onSelectLesson={setSelectedLesson}
      />

      {/* Lesson Viewer */}
      <main className="flex min-w-0 flex-1 flex-col bg-white">
        <LessonViewer
          lesson={selectedLesson}
          previousLesson={previousLesson}
          nextLesson={nextLesson}
          onSelectLesson={setSelectedLesson}
        />
      </main>
    </div>
  );
}