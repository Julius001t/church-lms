import api from "@/lib/api";

import type {
  Enrollment,
  LessonProgress,
} from "../types/enrollment";

interface PaginatedEnrollments {
  count: number;
  next: string | null;
  previous: string | null;
  results: Enrollment[];
}

export async function getEnrollments(): Promise<Enrollment[]> {
  const { data } = await api.get<PaginatedEnrollments>(
    "/enrollments/"
  );

  return data.results;
}

export async function enrollInCourse(
  courseId: string
): Promise<Enrollment> {
  const { data } = await api.post<Enrollment>(
    "/enrollments/",
    {
      course: courseId,
    }
  );

  return data;
}

export async function getLessonProgress(): Promise<
  LessonProgress[]
> {
  const { data } = await api.get<LessonProgress[]>(
    "/enrollments/progress/"
  );

  return data;
}

export async function completeLesson(
  lessonId: string
) {
  const { data } = await api.post(
    `/enrollments/lessons/${lessonId}/complete/`
  );

  return data;
}