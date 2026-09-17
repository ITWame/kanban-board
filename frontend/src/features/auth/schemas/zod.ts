import { z } from "zod";

export const signUpSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "The password must be at least 8 characters long.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "The password must contain at least one uppercase letter, one lowercase letter, and one number.",
    ),
});

export const signInSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, "The new password must be at least 8 characters long.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "The new password must contain at least one uppercase letter, one lowercase letter, and one number.",
      ),
    confirmPassword: z
      .string()
      .min(1, "Password confirmation is required."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "The passwords must match",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;