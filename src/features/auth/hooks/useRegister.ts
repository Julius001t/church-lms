import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { register } from "../api/authApi";

export function useRegister() {
  return useMutation({
    mutationFn: register,

    onSuccess: () => {
      toast.success("Account created successfully.");
    },

    onError: () => {
      toast.error("Registration failed.");
    },
  });
}