import { z } from "zod";

export const signUpSchema = z.object({
  email: z.email("Indtast venligst en gyldig e-mailadresse"),
  password: z
    .string()
    .min(1, "Adgangskode er påkrævet")
    .min(8, "Adgangskoden skal være mindst 8 tegn lang")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Adgangskoden skal indeholde mindst ét stort bogstav, ét lille bogstav og ét tal",
    ),
});

export const signInSchema = z.object({
  email: z.email("Indtast venligst en gyldig e-mailadresse"),
  password: z.string().min(1, "Adgangskode er påkrævet"),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Indtast venligst en gyldig e-mailadresse"),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "Ny adgangskode er påkrævet")
      .min(8, "Ny adgangskoden skal være mindst 8 tegn lang")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Ny adgangskode skal indeholde mindst ét stort bogstav, ét lille bogstav og ét tal",
      ),
    confirmPassword: z
      .string()
      .min(1, "Bekræftelse af adgangskode er påkrævet"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Adganskoderne skal matche",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;