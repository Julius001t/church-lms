import { useEnrollCourse } from "../hooks/useEnrollCourse";

interface Props {
  courseId: string;
  isEnrolled: boolean;
}

export default function EnrollButton({
  courseId,
  isEnrolled,
}: Props) {
  const enrollMutation = useEnrollCourse();

  function handleEnroll() {
    if (isEnrolled) {
      return;
    }

    enrollMutation.mutate(courseId);
  }

  if (isEnrolled) {
    return (
      <button
        type="button"
        disabled
        className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white"
      >
        ✓ Enrolled
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleEnroll}
      disabled={enrollMutation.isPending}
      className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {enrollMutation.isPending
        ? "Enrolling..."
        : "Enroll in Course"}
    </button>
  );
}