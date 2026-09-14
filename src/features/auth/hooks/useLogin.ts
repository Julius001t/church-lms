import { useMutation } from "@tanstack/react-query";

import { login } from "../api/authApi";
import { useAuthStore } from "../store/useAuthStore";

export function useLogin() {
  const loginUser = useAuthStore(
    (state) => state.login,
  );

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      loginUser(
        data.user,
        data.access,
        data.refresh,
      );
    },
  });
}