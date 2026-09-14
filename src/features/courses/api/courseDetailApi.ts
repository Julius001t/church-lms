import api from "@/lib/api";

import type { Course } from "../types/course";

export async function getCourse(id: string): Promise<Course> {
  const response = await api.get(`courses/${id}/`);

  return response.data;
}