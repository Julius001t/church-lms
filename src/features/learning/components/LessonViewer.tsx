import CompleteLessonButton from "@/features/enrollments/components/CompleteLessonButton";

import type { Lesson } from "../types/learning";

interface Props {
  lesson: Lesson | null;
  previousLesson: Lesson | null;
  nextLesson: Lesson | null;
  onSelectLesson: (lesson: Lesson) => void;
}

export default function LessonViewer({
  lesson,
  previousLesson,
  nextLesson,
  onSelectLesson,
}: Props) {
  if (!lesson) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-lg text-gray-500">
          Select a lesson to begin learning.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-white">
      {/* ================= Header ================= */}

      <div className="border-b px-8 py-6">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {lesson.lesson_type}
        </span>

        <h1 className="mt-4 text-3xl font-bold">
          {lesson.title}
        </h1>
      </div>

      {/* ================= Lesson Content ================= */}

      <div className="flex-1 overflow-y-auto px-8 py-8">
        {lesson.lesson_type === "TEXT" && (
          <article className="prose max-w-none">
            {lesson.content}
          </article>
        )}

        {lesson.lesson_type === "VIDEO" && (
          <video
            controls
            className="w-full rounded-xl"
          >
            <source
              src={lesson.video_url}
            />
            Your browser does not support video playback.
          </video>
        )}

        {lesson.lesson_type === "PDF" &&
          lesson.pdf_file && (
            <iframe
              src={lesson.pdf_file}
              className="h-[700px] w-full rounded-xl border"
              title={lesson.title}
            />
          )}

        {lesson.lesson_type === "AUDIO" &&
          lesson.audio_file && (
            <audio
              controls
              className="w-full"
            >
              <source
                src={lesson.audio_file}
              />
              Your browser does not support audio.
            </audio>
          )}

        {/* ================= Complete Lesson ================= */}

        {!lesson.completed && (
          <div className="mt-10">
            <CompleteLessonButton
              lessonId={lesson.id}
            />
          </div>
        )}

        {lesson.completed && (
          <div className="mt-10 rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="font-medium text-green-700">
              ✅ Lesson completed
            </p>

            {lesson.completed_at && (
              <p className="mt-1 text-sm text-green-600">
                Completed on{" "}
                {new Date(
                  lesson.completed_at
                ).toLocaleString()}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ================= Navigation ================= */}

      <div className="flex items-center justify-between border-t px-8 py-5">
        <button
          disabled={!previousLesson}
          onClick={() =>
            previousLesson &&
            onSelectLesson(previousLesson)
          }
          className="rounded-lg border px-5 py-3 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ← Previous Lesson
        </button>

        <button
          disabled={!nextLesson}
          onClick={() =>
            nextLesson &&
            onSelectLesson(nextLesson)
          }
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next Lesson →
        </button>
      </div>
    </div>
  );
}