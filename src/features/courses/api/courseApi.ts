import api from "@/lib/api";
import type { CourseResponse } from "../types/course";

export async function getCourses(): Promise<CourseResponse> {
  const response = await api.get("courses/");

  return response.data;
}