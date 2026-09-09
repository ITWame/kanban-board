import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { SignUpFormData, signUpSchema } from "../schemas/zod";
import FormField from "./form-field";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import type {
  SignUpErrors,
  SignUpFutureResource,
} from "@clerk/tanstack-react-start/types";

interface SignUpFormProps {
  signUp: SignUpFutureResource;
  fetchStatus: "idle" | "fetching";
}

function SignUpForm({ signUp }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit = async (formData: SignUpFormData) => {
    const emailAddress = formData.email;
    const password = formData.password;

    const { error } = await signUp.password({
      emailAddress,
      password,
    });

    if (error) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling

      setError("root", { message: error.message });
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (!error) await signUp.verifications.sendEmailCode();
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
          placeholder="Adgangskode"
          type="password"
          error={errors.password?.message}
          icon={<Lock className="size-4.5" />}
          register={register}
        />
      </div>
      <div className="flex items-center justify-center">
        <div id="clerk-captcha" />
      </div>
      <Button type="submit" size={"2xl"}>
        Tilmeld Dig
      </Button>
    </form>
  );
}

export default SignUpForm;
