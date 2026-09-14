import {
  BookOpen,
  Layers,
  Star,
  User,
} from "lucide-react";

import { Link } from "react-router-dom";

import type { Course } from "../types/course";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({
  course,
}: CourseCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border-r border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Course Image */}
      <div className="h-48 overflow-hidden bg-gray-100">
        {course.image ? (
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6">

        {/* Title + Status */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {course.title}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {course.slug}
            </p>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              course.is_published
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {course.is_published
              ? "Published"
              : "Draft"}
          </span>
        </div>

        {/* Description */}
        <p className="mb-6 line-clamp-3 text-gray-600">
          {course.description}
        </p>

        {/* Course Information */}
        <div className="space-y-3 text-sm text-gray-700">

          <div className="flex items-center gap-2">
            <User size={18} />
            <span>
              {course.instructor_name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Layers size={18} />
            <span>
              {course.module_count} Modules
            </span>
          </div>

          <div className="flex items-center gap-2">
            <BookOpen size={18} />
            <span>
              {course.lesson_count} Lessons
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Star
              size={18}
              className="text-yellow-500"
            />

            <span>
              {course.average_rating} (
              {course.total_reviews} Reviews)
            </span>
          </div>

        </div>

        {/* View Course */}
        <Link
          to={`/courses/${course.id}`}
          className="mt-6 block rounded-lg bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
        >
          View Course
        </Link>

      </div>
    </article>
  );
}