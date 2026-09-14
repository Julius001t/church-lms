import { z } from "zod";

export const registerSchema = z
  .object({
    full_name: z
      .string()
      .min(3, "Full name must be at least 3 characters"),

    email: z
      .email("Please enter a valid email address")
      .trim(),

    phone_number: z
      .string()
      .min(11, "Phone number must be at least 11 digits"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirm_password: z
      .string()
      .min(8, "Please confirm your password"),
  })
  .refine(
    (data) => data.password === data.confirm_password,
    {
      message: "Passwords do not match",
      path: ["confirm_password"],
    },
  );

export type RegisterFormData = z.infer<
  typeof registerSchema
>;