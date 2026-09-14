export interface Choice {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  question: string;
  order: number;
  choices: Choice[];
}

export interface Exam {
  id: string;
  module: string;
  module_title: string;
  course_title: string;
  title: string;
  description: string;
  duration: number;
  pass_mark: number;
  questions: Question[];
}

export interface ExamListItem {
  id: string;
  module: string;
  module_title: string;
  course_title: string;
  title: string;
  description: string;
  duration: number;
  pass_mark: number;
  questions: Question[];
}


// =========================
// Submit Exam
// =========================

export interface SubmitAnswer {
  question: string;
  selected_choice: string;
}

export interface SubmitExamPayload {
  answers: SubmitAnswer[];
}

export interface SubmitExamResponse {
  attempt_id: string;
  status: string;
  message: string;
}


// =========================
// Exam Attempt
// =========================

export interface ExamAttempt {
  id: string;
  student: string;
  exam: string;
  score: number;
  passed: boolean;
  result_released: boolean;
  status: string;
  submitted_at: string | null;
}


// =========================
// Exam Review
// =========================

export interface CorrectChoice {
  id: string;
  text: string;
}

export interface ReviewAnswer {
  id: string;

  question: string;
  question_text: string;

  choices: Choice[];

  selected_choice: string | null;
  selected_choice_text: string | null;

  correct_choice: CorrectChoice | null;

  is_correct: boolean;
}

export interface ExamReview {
  id: string;

  exam: string;
  exam_title: string;

  module_title: string;
  course_title: string;

  score: number;
  passed: boolean;
  status: string;

  submitted_at: string | null;

  answers: ReviewAnswer[];
}