import {
  FileText,
  Video,
  File,
  Music,
} from "lucide-react";

import type { Lesson } from "../types/course";

interface Props {
  lesson: Lesson;
}

export default function LessonItem({
  lesson,
}: Props) {
  const getIcon = () => {
    switch (lesson.lesson_type) {
      case "VIDEO":
        return <Video size={18} />;

      case "PDF":
        return <File size={18} />;

      case "AUDIO":
        return <Music size={18} />;

      default:
        return <FileText size={18} />;
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg border bg-white px-4 py-3 transition hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <div className="text-blue-600">
          {getIcon()}
        </div>

        <div>
          <h4 className="font-medium">
            {lesson.title}
          </h4>

          <p className="text-xs text-gray-500">
            {lesson.lesson_type}
          </p>
        </div>
      </div>

      {lesson.is_published ? (
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          Published
        </span>
      ) : (
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          Draft
        </span>
      )}
    </div>
  );
}