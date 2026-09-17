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
import { UUID } from "node:crypto";
import DialogFormContent from "./dialog-form-content";

interface ColumnProps {
  id: string;
  borderColor: string;
  title: string;
  issues: Issue[];
  onAddIssue: (data: Omit<Issue, "id">) => void;
  onDeleteIssue: (id: UUID) => void;
  onUpdateIssue: (updatedIssue: Issue) => void;
  column: string;
}

function Column({
  column,
  issues,
  borderColor,
  title,
  id,
  onAddIssue,
  onDeleteIssue,
  onUpdateIssue,
}: ColumnProps) {
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
      priority: data.priority,
      status: data.status,
      title: data.title,
    };
    onAddIssue(issue);
    form.reset();
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
        <DialogFormContent title={title} form={form} onSubmit={onSubmit} />
      </Dialog>
      {issues.map((issue, index) => (
        <>
          <Card
            key={issue.id}
            id={issue.id}
            column={column}
            index={index}
            title={issue.title}
            priority={issue.priority}
            description={issue.description}
            onDeleteIssue={onDeleteIssue}
            onUpdateIssue={onUpdateIssue}
          />
        </>
      ))}
    </div>
  );
}

export default Column;
