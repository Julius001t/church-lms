import { BookOpen, Layers, Star, User } from "lucide-react";

import type { Course } from "../types/course";

interface CourseHeroProps {
  course: Course;
}

export default function CourseHero({
  course,
}: CourseHeroProps) {
  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="grid md:grid-cols-2">
        {/* Course Image */}
        <div className="h-72 md:h-full">
          {course.image ? (
            <img
              src={course.image}
              alt={course.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-72 items-center justify-center bg-gray-100 text-gray-400">
              <BookOpen size={64} />
            </div>
          )}
        </div>

        {/* Course Information */}
        <div className="p-8">
          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            Course
          </span>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            {course.title}
          </h1>

          <p className="mt-4 leading-7 text-gray-600">
            {course.description}
          </p>

          <div className="mt-6 space-y-3 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{course.instructor_name}</span>
            </div>

            <div className="flex items-center gap-2">
              <Layers size={18} />
              <span>{course.module_count} Modules</span>
            </div>

            <div className="flex items-center gap-2">
              <BookOpen size={18} />
              <span>{course.lesson_count} Lessons</span>
            </div>

            <div className="flex items-center gap-2">
              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />

              <span>
                {course.average_rating} (
                {course.total_reviews} Reviews)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}