import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "@/src/components/ui/input-group"
import { useState } from "react"
import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form"
import {Eye, EyeOff} from "lucide-react"

interface FormFieldProps<T extends FieldValues = FieldValues> {
  id: string
  name: FieldPath<T>
  type?: "email" | "password"
  placeholder: string
  error?: string
  icon: React.ReactNode
  register: UseFormRegister<T>
}

function FormField<T extends FieldValues = FieldValues>({
  id,
  name,
  type,
  error,
  icon,
  placeholder,
  register,
}: FormFieldProps<T>) {
  const [toggleShowPassword, setToggleShowPassword] = useState<boolean>(false)

  return (
    <div className="flex flex-col gap-2">
      <InputGroup>
        <InputGroupAddon>{icon}</InputGroupAddon>
        <InputGroupInput
          id={id}
          type={
            type === "password"
              ? toggleShowPassword
                ? "email"
                : "password"
              : type
          }
          placeholder={placeholder}
          aria-invalid={typeof error === "string"}
          {...register(name)}
        />
        {type === "password" && (
          <InputGroupAddon align={"inline-end"}>
            <InputGroupButton
              type="button"
              onClick={() => setToggleShowPassword((prev) => !prev)}
            >
              {toggleShowPassword ? (
                <EyeOff className="size-4.5" />
              ) : (
                <Eye className="size-4.5" />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
      {error && (
        <p className="mt-2 text-sm font-medium text-destructive">{error}</p>
      )}
    </div>
  )
}

export default FormField