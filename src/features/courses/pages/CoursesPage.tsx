import CourseGrid from "../components/CourseGrid";
import { useCourses } from "../hooks/useCourses";

export default function CoursesPage() {
  const {
    data,
    isLoading,
    isError,
  } = useCourses();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-gray-500">
          Loading courses...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-red-500">
          Failed to load courses.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Courses
        </h1>

        <p className="mt-2 text-gray-500">
          Browse all available courses.
        </p>
      </div>

      <CourseGrid
        courses={data?.results ?? []}
      />
    </div>
  );
}