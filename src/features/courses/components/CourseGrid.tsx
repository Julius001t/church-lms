import CourseCard from "./CourseCard";

import type { Course } from "../types/course";

interface Props {
  courses: Course[];
}

export default function CourseGrid({
  courses,
}: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
        />
      ))}
    </div>
  );
}