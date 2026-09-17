import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { SignInFormData, signInSchema } from "../schemas/zod";
import FormField from "./form-field";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { SignInFutureResource } from "@clerk/tanstack-react-start/types";

interface SignInFormProps {
  signIn: SignInFutureResource;
}

function SingInForm({ signIn }: SignInFormProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  const onSubmit = async (formData: SignInFormData) => {
    const emailAddress = formData.email as string;
    const password = formData.password as string;

    const { error } = await signIn.password({
      emailAddress,
      password,
    });

    if (error) {
      setError("root", { message: error.message });
      return;
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
    } else if (signIn.status === "needs_second_factor") {
      // See https://clerk.com/docs/guides/development/custom-flows/authentication/multi-factor-authentication
    } else if (signIn.status === "needs_client_trust") {
      // For other second factor strategies,
      // see https://clerk.com/docs/guides/development/custom-flows/authentication/device-trust
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === "email_code",
      );

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    } else {
      // Check why the sign-in is not complete
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {errors.root && (
        <Alert variant="destructive" className="p-4">
          <AlertDescription>{errors.root?.message}</AlertDescription>
        </Alert>
      )}
      <FormField
        id="email"
        name="email"
        placeholder="Email"
        type="email"
        error={errors.email?.message}
        icon={<Mail className="size-4.5" />}
        register={register}
      />
      <div className="flex flex-col gap-2">
        <FormField
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          error={errors.password?.message}
          icon={<Lock className="size-4.5" />}
          register={register}
        />
        <div className="flex justify-end">
          <Link to="/forgot-password">
            <Button
              type="button"
              variant={"link"}
              className={"text-indigo-600"}
            >
              Forgot password?
            </Button>
          </Link>
        </div>
      </div>
      <Button type="submit" size={"2xl"}>
        Log in
      </Button>
    </form>
  );
}

export default SingInForm;
