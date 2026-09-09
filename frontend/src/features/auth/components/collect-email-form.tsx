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
        title="Glemt Adgangskoden?"
        subtitle="Indtast den e-mailadresse, du brugte til at tilmelde dig, så sender vi dig en engangskode så du kan nulstille din adgangskode."
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
          Godkend Email
        </Button>
      </form>
      <Footer
        text={"Kan du huske din adgangskode"}
        href={"/login"}
        hrefText={"Login"}
      />
    </AuthContainer>
  );
}

export default CollectEmailForm;
