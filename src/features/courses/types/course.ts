export interface Lesson {
  id: string;
  module: string;
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

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;

  image: string | null;

  instructor: string;
  instructor_name: string;

  average_rating: number;
  total_reviews: number;

  module_count: number;
  lesson_count: number;

  is_published: boolean;
  created_at: string;

  modules: Module[];
}

export interface CourseResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Course[];
}