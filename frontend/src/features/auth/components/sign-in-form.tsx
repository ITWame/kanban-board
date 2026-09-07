import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { SignInFormData, signInSchema } from "../schemas/zod";
import FormField from "./form-field";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

function SingInForm() {
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  return (
    <form className="flex flex-col gap-4">
      {/* {errors.root && (
        <Alert variant="destructive" className="p-4">
          <AlertDescription>{errors.root?.message}</AlertDescription>
        </Alert>
      )} */}
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
         <div className="flex justify-end">
          <Link to="/forgot-password">
            <Button type="button" variant={"link"} className={"text-indigo-600"}>
              Glemt adgangskode?
            </Button>
          </Link>
        </div>
      </div>
      <Button type="submit" size={"2xl"}>
        Log på
      </Button>
    </form>
  );
}

export default SingInForm;
