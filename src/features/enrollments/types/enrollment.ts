export interface Enrollment {
  id: string;
  student: string;
  student_name: string;

  course: string;
  course_title: string;

  progress: number;

  status: "ACTIVE" | "COMPLETED" | "DROPPED";

  completed_at: string | null;
  created_at: string;
}

export interface LessonProgress {
  id: string;

  lesson: string;
  lesson_title: string;

  lesson_type: string;
  module: string;

  completed: boolean;

  completed_at: string | null;

  created_at: string;
}