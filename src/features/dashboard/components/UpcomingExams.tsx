import {
  ArrowRight,
  ClipboardCheck,
  Clock,
} from "lucide-react";

import { Link } from "react-router-dom";

interface ExamAttempt {
  id: string;
  exam: string;
  exam_title: string;
  course_title: string;
  score: number;
  passed: boolean;
  status: string;
  submitted_at: string;
}

interface Props {
  examAttempts: ExamAttempt[];
}

export default function UpcomingExams({
  examAttempts,
}: Props) {
  const pendingExams = examAttempts.filter(
    (exam) => !exam.passed,
  );

  return (
    <section>
      {/* =========================
          Section Header
      ========================= */}

      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Upcoming Exams
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Exams that still need your attention.
          </p>
        </div>

        <Link
          to="/exams"
          className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          View All
        </Link>
      </div>

      {/* =========================
          Empty State
      ========================= */}

      {pendingExams.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <ClipboardCheck size={22} />
          </div>

          <h3 className="mt-4 font-semibold text-gray-900">
            You're all caught up
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            You don't have any pending exams right now.
          </p>
        </div>
      ) : (
        /* =========================
           Exam List
        ========================= */

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="divide-y divide-gray-100">
            {pendingExams.slice(0, 5).map((exam) => (
              <div
                key={exam.id}
                className="flex flex-col gap-4 p-5 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Exam information */}

                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <ClipboardCheck size={21} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-gray-900">
                      {exam.exam_title}
                    </h3>

                    <p className="mt-1 truncate text-sm text-gray-500">
                      {exam.course_title}
                    </p>

                    <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock size={14} />

                      <span>
                        Status: {exam.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action */}

                <Link
                  to={`/exams/${exam.exam}`}
                  className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Take Exam

                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}