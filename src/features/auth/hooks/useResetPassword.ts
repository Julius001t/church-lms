import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { resetPassword } from "../api/authApi";


interface ResetPasswordData {
  uid: string;
  token: string;
  password: string;
}


export function useResetPassword() {
  return useMutation({
    mutationFn: ({
      uid,
      token,
      password,
    }: ResetPasswordData) =>
      resetPassword(
        uid,
        token,
        password
      ),

    onSuccess: () => {
      toast.success(
        "Password reset successfully."
      );
    },

    onError: () => {
      toast.error(
        "Invalid or expired password reset link."
      );
    },
  });
}