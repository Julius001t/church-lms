export interface Lesson {
  id: string;

  module: string;

  module_title: string;

  course_id: string;

  title: string;

  lesson_type:
    | "TEXT"
    | "VIDEO"
    | "PDF"
    | "AUDIO";

  content: string;

  video_url: string;

  pdf_file: string | null;

  audio_file: string | null;

  order: number;

  is_published: boolean;

  completed: boolean;

  completed_at: string | null;
}

export interface Module {
  id: string;

  course: string;

  title: string;

  description: string;

  order: number;

  lesson_count: number;

  lessons: Lesson[];
}