import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { completeLesson } from "../api/enrollmentApi";

export function useCompleteLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeLesson,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lesson-progress"],
      });

      queryClient.invalidateQueries({
        queryKey: ["enrollments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["modules"],
      });
    },
  });
}