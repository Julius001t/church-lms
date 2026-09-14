import {
  BookOpen,
  Clock,
  GraduationCap,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import type { ExamListItem } from "../types/exam";

interface Props {
  exam: ExamListItem;
}

export default function ExamCard({ exam }: Props) {
  const navigate = useNavigate();

  function handleStartExam() {
    navigate(`/exams/${exam.id}`);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
          <GraduationCap className="h-6 w-6 text-blue-600" />
        </div>

        <div className="min-w-0">
          <p className="text-sm text-gray-500">
            {exam.course_title}
          </p>

          <h2 className="mt-1 text-xl font-bold text-gray-900">
            {exam.title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {exam.module_title}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
        {exam.description || "No description available."}
      </p>

      {/* Information */}
      <div className="mt-6 grid grid-cols-2 gap-4 border-y border-gray-200 py-4">
        {/* Duration */}
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-400" />

          <div>
            <p className="text-xs text-gray-500">
              Duration
            </p>

            <p className="font-semibold text-gray-900">
              {exam.duration} minutes
            </p>
          </div>
        </div>

        {/* Questions */}
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-gray-400" />

          <div>
            <p className="text-xs text-gray-500">
              Questions
            </p>

            <p className="font-semibold text-gray-900">
              {exam.questions.length}
            </p>
          </div>
        </div>
      </div>

      {/* Pass Mark */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          Pass mark
        </p>

        <p className="font-semibold text-gray-900">
          {exam.pass_mark}%
        </p>
      </div>

      {/* Start Exam */}
      <button
        type="button"
        onClick={handleStartExam}
        className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Start Exam
      </button>
    </div>
  );
}