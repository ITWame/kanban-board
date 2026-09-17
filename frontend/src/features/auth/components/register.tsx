import { useAuth, useSignUp } from "@clerk/tanstack-react-start";
import Header from "./header";
import SignUpForm from "./sign-up-form";
import Footer from "./footer";
import Verfication from "./verification";
import AuthContainer from "./container";
import { Dispatch, SetStateAction } from "react";
import { ClerkAPIError } from "@clerk/tanstack-react-start/types";
import { useNavigate } from "@tanstack/react-router";

function Register() {
  const { signUp, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();

  const navigate = useNavigate();

  const isFetching = fetchStatus === "fetching";

  const handleVerify = async (
    code: string,
    setError: Dispatch<SetStateAction<ClerkAPIError | null | undefined>>,
  ) => {
    const { error } = await signUp.verifications.verifyEmailCode({
      code,
    });

    if (error) {
      setError(error);
    }

    if (signUp.status === "complete") {
      await signUp.finalize({
        // Redirect the user to the home page after signing up
        navigate: ({ session, decorateUrl }) => {
          // Handle session tasks
          // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
          if (session?.currentTask) {
            console.log(session?.currentTask);
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
    } else {
      // Check why the sign-up is not complete
      console.error("Sign-up attempt not complete:", signUp);
    }
  };

  const handleResendCode = async () => {
    await signUp.verifications.sendEmailCode();
  };

  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    return (
      <AuthContainer>
        <Verfication
          onVerify={handleVerify}
          onResendCode={handleResendCode}
          isFetching={isFetching}
          emailAddress={signUp.emailAddress}
        />
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <Header title="KGet Started" subtitle="Create a new account" />
      <SignUpForm signUp={signUp} fetchStatus={fetchStatus} />
      <Footer
        text={"Do you already have an account?"}
        href={"/login"}
        hrefText={"Login"}
      />
    </AuthContainer>
  );
}

export default Register;
