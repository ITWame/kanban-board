import { Button } from "@/src/components/ui/button";
import Header from "./header";
import { Mail } from "lucide-react";
import FormField from "./form-field";
import { useForm, UseFormSetError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
  ResetPasswordFormData,
} from "../schemas/zod";
import Footer from "./footer";
import AuthContainer from "./container";
import { useSignIn } from "@clerk/tanstack-react-start";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import CollectEmailForm from "./collect-email-form";
import Verfication from "./verification";
import { ClerkAPIError } from "@clerk/tanstack-react-start/types";
import ResetPasswordForm from "./reset-password-form";

function ForgotPassword() {
  const [codeSent, setCodeSent] = useState(false);

  const { signIn, fetchStatus } = useSignIn();

  const navigate = useNavigate();

  const isFetching = fetchStatus === "fetching";

  async function sendCode(formData: ForgotPasswordFormData) {
    const { error: createError } = await signIn.create({
      identifier: formData.email,
    });

    if (createError) {
      console.error(JSON.stringify(createError, null, 2));
      return;
    }

    const { error: sendCodeError } =
      await signIn.resetPasswordEmailCode.sendCode();

    if (sendCodeError) {
      console.error(JSON.stringify(sendCodeError, null, 2));
      return;
    }

    setCodeSent(true);
  }

  async function verifyCode(
    code: string,
    setError: Dispatch<SetStateAction<ClerkAPIError | null | undefined>>,
  ) {
    const { error } = await signIn.resetPasswordEmailCode.verifyCode({
      code,
    });
    if (error) {
      setError(error);
      console.error(JSON.stringify(error, null, 2));
      return;
    }
  }

  async function resendCode() {
    await signIn.resetPasswordEmailCode.sendCode();
  }

  async function submitNewPassword(
    formData: ResetPasswordFormData,
    setError: UseFormSetError<{
      newPassword: string;
      confirmPassword: string;
    }>,
  ) {
    const password = formData.confirmPassword;

    const { error } = await signIn.resetPasswordEmailCode.submitPassword({
      password,
      // Optional: sign the user out of all other authenticated sessions
      signOutOfOtherSessions: true,
    });
    if (error) {
      setError("root", { message: error.message });
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (signIn.status === "complete") {
      const { error } = await signIn.finalize({
        navigate: async ({ session, decorateUrl }) => {
          // Handle session tasks
          // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
          if (session?.currentTask) {
            console.log(session.currentTask);
            return;
          }

          // If no session tasks, navigate the signed-in user to the home page
          const url = decorateUrl("/");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            navigate({ to: url });
          }
        },
      });

      if (error) {
        console.error(JSON.stringify(error, null, 2));
        return;
      }
    } else if (signIn.status === "needs_second_factor") {
      // See https://clerk.com/docs/guides/development/custom-flows/authentication/multi-factor-authentication
    } else {
      // Check why the sign-in is not complete
      console.error("Sign-in attempt not complete:", signIn);
    }
  }

  return (
    <>
      {!codeSent && <CollectEmailForm onSubmit={sendCode} />}
      {codeSent && signIn.status !== "needs_new_password" && (
        <AuthContainer>
          <Verfication
            onVerify={verifyCode}
            onResendCode={resendCode}
            isFetching={isFetching}
          />
        </AuthContainer>
      )}
      {signIn.status === "needs_new_password" && (
        <ResetPasswordForm
          onSubmit={submitNewPassword}
          isFetching={isFetching}
        />
      )}
    </>
  );
}

export default ForgotPassword;
