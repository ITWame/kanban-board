import { Button } from "@/src/components/ui/button";
import { EllipsisIcon, PlusIcon } from "lucide-react";
import Card from "./card";
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Textarea } from "@/src/components/ui/textarea";
import {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
} from "@/src/components/ui/input-group";
import StatusSelect from "./status-select";
import PrioritySelect from "./priority-select";
import { Issue } from "../types/issue";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { formSchema } from "../schemas/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldSet,
} from "@/src/components/ui/field";

interface ColumnProps {
  id: string;
  borderColor: string;
  title: string;
  issues: Issue[];
  onAddIssue: (data: Omit<Issue, "id">) => void;
}

function Column({ issues, borderColor, title, id, onAddIssue }: ColumnProps) {
  const [open, setOpen] = useState(false);

  const { ref } = useDroppable({
    id,
    type: "column",
    accept: "issue",
    collisionPriority: CollisionPriority.High,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: title,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const issue: Omit<Issue, "id"> = {
      description: data.description,
      priority: data.priority.toLowerCase(),
      status: data.status.toLowerCase(),
      title: data.title,
    };
    onAddIssue(issue);
    setOpen(false);
  };

  return (
    <div
      className={`flex flex-col gap-4 bg-background p-4 rounded-lg h-full relative`}
      ref={ref}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <span className={`rounded-full border-2 ${borderColor} w-3 h-3`} />
          <span className="text-sm">{title}</span>
          <span className="rounded-full bg-muted-foreground w-1 h-1" />
          <span className="text-sm">{issues.length}</span>
        </div>
        <Button variant={"ghost"}>
          <EllipsisIcon />
        </Button>
      </div>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <Button
          variant={"ghost"}
          size={"xl"}
          className={"border border-input border-dashed"}
          onClick={() => setOpen(!open)}
        >
          <PlusIcon />
        </Button>
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
                          defaultValue={title}
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
              <Button
                size={"xl"}
                variant={"outline"}
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button size={"xl"} type="submit" form="form">
                Save
              </Button>
            </Field>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {issues.map((issue, index) => (
        <>
          <Card
            key={issue.id}
            id={issue.id}
            index={index}
            title={issue.title}
            priority={issue.priority}
            description={issue.description}
          />
        </>
      ))}
    </div>
  );
}

export default Column;
