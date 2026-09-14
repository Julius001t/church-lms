import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import LessonItem from "./LessonItem";

import type { Module } from "../types/course";

interface Props {
  module: Module;
}

export default function ModuleAccordion({
  module,
}: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between bg-gray-50 px-5 py-4 transition hover:bg-gray-100"
      >
        <div>
          <h3 className="text-left text-lg font-semibold">
            {module.title}
          </h3>

          <p className="text-sm text-gray-500">
            {module.description}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
            {module.lessons.length} Lessons
          </span>

          {open ? (
            <ChevronDown size={20} />
          ) : (
            <ChevronRight size={20} />
          )}
        </div>
      </button>

      {open && (
        <div className="space-y-3 p-5">
          {module.lessons.length > 0 ? (
            module.lessons.map((lesson) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No lessons available.
            </p>
          )}
        </div>
      )}
    </div>
  );
}