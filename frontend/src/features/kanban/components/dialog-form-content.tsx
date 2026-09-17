import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldSet,
} from "@/src/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
} from "@/src/components/ui/input-group";
import { PlusIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import StatusSelect from "./status-select";
import PrioritySelect from "./priority-select";

interface DialogFormContentProps {
  title: string;
  form: UseFormReturn<
    {
      title: string;
      description: string;
      status: string;
      priority: string;
    },
    any,
    {
      title: string;
      description: string;
      status: string;
      priority: string;
    }
  >;
  onSubmit: (data: {
    title: string;
    description: string;
    status: string;
    priority: string;
  }) => void;
}

function DialogForm({ form, title, onSubmit }: DialogFormContentProps) {
  return (
    <DialogContent className={"min-w-lg"}>
      <DialogHeader>
        <DialogTitle>Add Issue</DialogTitle>
        <DialogDescription>
          Create a new issue for you or your team to work on.
        </DialogDescription>
      </DialogHeader>
      <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Title"
                      autoComplete="off"
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      placeholder="Description"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <div className="flex gap-2">
              <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field aria-invalid={fieldState.invalid}>
                    <StatusSelect
                      name={field.name}
                      value={field.value}
                      onValuChange={field.onChange}
                      ariaInvalid={fieldState.invalid}
                    />
                  </Field>
                )}
              />
              <Controller
                name="priority"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field aria-invalid={fieldState.invalid}>
                    <PrioritySelect
                      name={field.name}
                      value={field.value}
                      onValuChange={field.onChange}
                      ariaInvalid={fieldState.invalid}
                    />
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </FieldSet>
      </form>
      <DialogFooter>
        <Field orientation={"horizontal"} className="flex justify-end">
          <Button size={"xl"} variant={"outline"} onClick={() => form.reset()}>
            Reset
          </Button>
          <Button size={"xl"} type="submit" form="form">
            Save
          </Button>
        </Field>
      </DialogFooter>
    </DialogContent>
  );
}

export default DialogForm;
