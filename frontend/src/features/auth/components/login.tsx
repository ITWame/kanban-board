import { useSignIn } from "@clerk/tanstack-react-start";
import AuthContainer from "./container";
import Footer from "./footer";
import Header from "./header";
import SingInForm from "./sign-in-form";
import Verfication from "./verification";
import { useNavigate } from "@tanstack/react-router";
import { Dispatch, SetStateAction } from "react";
import { ClerkAPIError } from "@clerk/tanstack-react-start/types";

function Login() {
  const { signIn, fetchStatus } = useSignIn();

  const navigate = useNavigate();

  const isFetching = fetchStatus === "fetching";

  const handleVerify = async (
    code: string,
    setError: Dispatch<SetStateAction<ClerkAPIError | null | undefined>>,
  ) => {
    const { error } = await signIn.mfa.verifyEmailCode({ code });

    if (error) {
      setError(error);
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
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
      // Check why the sign-in is not complete
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  const handleResendCode = async () => {
    signIn.mfa.sendEmailCode();
  };

  if (signIn.status === "needs_client_trust") {
    return (
      <AuthContainer>
        <Verfication
          onVerify={handleVerify}
          onResendCode={handleResendCode}
          isFetching={isFetching}
        />
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <Header title="Welcome!👋" subtitle="Log in to your account" />
      <SingInForm signIn={signIn} />
      <Footer
        text={"Don't you have an account?"}
        href={"/register"}
        hrefText={"Register"}
      />
    </AuthContainer>
  );
}

export default Login;
