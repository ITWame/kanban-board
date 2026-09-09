import { Alert, AlertDescription } from "@/src/components/ui/alert";
import AuthContainer from "./container";
import Header from "./header";
import FormField from "./form-field";
import { Button } from "@/src/components/ui/button";
import { useForm, UseFormSetError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordFormData, resetPasswordSchema } from "../schemas/zod";
import { Lock } from "lucide-react";
import { Spinner } from "@/src/components/ui/spinner";

interface ResetPasswordFormProps {
  onSubmit: (
    formData: ResetPasswordFormData,
    setError: UseFormSetError<{
      newPassword: string;
      confirmPassword: string;
    }>,
  ) => void;
  isFetching: boolean;
}

function ResetPasswordForm({ onSubmit, isFetching }: ResetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  return (
    <AuthContainer>
      <Header
        title="Nustil din adgangskode"
        subtitle="Indtast en ny adgangskode."
      />
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit((formData) => onSubmit(formData, setError))}
      >
        {errors.root && (
          <Alert variant="destructive" className="p-4">
            <AlertDescription>{errors.root?.message}</AlertDescription>
          </Alert>
        )}
        <FormField
          id="password"
          name="newPassword"
          placeholder="Ny adgangskode"
          type="password"
          error={errors.newPassword?.message}
          icon={<Lock className="size-4.5" />}
          register={register}
        />
        <FormField
          id="password"
          name="confirmPassword"
          placeholder="Bekræftelse af adgangskode"
          type="password"
          error={errors.confirmPassword?.message}
          icon={<Lock className="size-4.5" />}
          register={register}
        />
        <Button type="submit" size={"2xl"} disabled={isFetching}>
          {isFetching && <Spinner />} Nustil adgangskode
        </Button>
      </form>
    </AuthContainer>
  );
}

export default ResetPasswordForm;
