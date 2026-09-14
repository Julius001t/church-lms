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

export interface ExamAttempt {
  id: string;

  exam: string;
  exam_title: string;
  course_title: string;

  score: number;
  passed: boolean;

  status: string;
  submitted_at: string;
}

export interface LessonProgress {
  id: string;

  lesson: string;
  lesson_title: string;

  course_title: string;

  completed: boolean;
  completed_at: string | null;
}

export interface Certificate {
  id: string;

  certificate_number: string;
  course_title: string;

  issued_at: string;
}

export interface ContinueLearning {
  course_id: string;
  course_title: string;

  module_id: string;
  module_title: string;

  lesson_id: string;
  lesson_title: string;

  lesson_type: string;

  progress: number;
}

export interface DashboardResponse {
  student_name: string;
  student_email: string;

  total_courses: number;
  completed_courses: number;

  total_exams: number;
  passed_exams: number;

  total_certificates: number;

  continue_learning: ContinueLearning | null;

  enrollments: Enrollment[];
  exam_attempts: ExamAttempt[];
  lesson_progress: LessonProgress[];
  certificates: Certificate[];
}