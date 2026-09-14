import api from "@/lib/api";

import type { Module } from "../types/learning";

export async function getModules(
  courseId: string
): Promise<Module[]> {
  const { data } = await api.get(
    `learning/modules/?course=${courseId}`
  );

  return data.results;
}