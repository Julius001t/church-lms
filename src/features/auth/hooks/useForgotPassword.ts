import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { forgotPassword } from "../api/authApi";


export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,

    onSuccess: () => {
      toast.success(
        "If your email exists, a password reset link has been sent."
      );
    },

    onError: () => {
      toast.error(
        "Unable to send password reset email."
      );
    },
  });
}