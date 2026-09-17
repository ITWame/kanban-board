import { Button } from "@/src/components/ui/button";
import AuthContainer from "./container";
import FormField from "./form-field";
import Header from "./header";
import Footer from "./footer";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { ForgotPasswordFormData, forgotPasswordSchema } from "../schemas/zod";

interface CollectEmailFormProps {
  onSubmit: (formData: ForgotPasswordFormData) => void;
}

function CollectEmailForm({ onSubmit }: CollectEmailFormProps) {
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  return (
    <AuthContainer>
      <Header
        title="Forgot your password?"
        subtitle="Enter the email address you used to sign up, and we will send you a one-time code so you can reset your password."
      />
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          error={errors.email?.message}
          icon={<Mail className="size-4.5" />}
          register={register}
        />
        <Button type="submit" size={"2xl"}>
          Approve Email
        </Button>
      </form>
      <Footer
        text={"Do you remember your password?"}
        href={"/login"}
        hrefText={"Login"}
      />
    </AuthContainer>
  );
}

export default CollectEmailForm;
