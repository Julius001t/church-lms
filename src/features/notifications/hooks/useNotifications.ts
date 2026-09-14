import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getNotifications,
  markNotificationAsRead,
} from "../api/notificationApi";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationAsRead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
}