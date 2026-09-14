import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { enrollInCourse } from "../api/enrollmentApi";

export function useEnrollCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: enrollInCourse,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["enrollments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });
}