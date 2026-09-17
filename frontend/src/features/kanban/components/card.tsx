import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Calendar, Edit, Ellipsis, Trash } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";
import { UUID } from "node:crypto";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import DialogFormContent from "./dialog-form-content";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../schemas/zod";
import z from "zod";
import { Issue } from "../types/issue";
import { Dialog } from "@/src/components/ui/dialog";

interface CardProps {
  id: UUID;
  index: number;
  priority: string;
  title: string;
  description: string;
  column: string;
  onDeleteIssue: (id: UUID) => void;
  onUpdateIssue: (updatedIssue: Issue) => void;
}

function Card({
  priority,
  title,
  description,
  id,
  index,
  column,
  onDeleteIssue,
  onUpdateIssue,
}: CardProps) {
  const [open, setOpen] = useState(false);

  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "issue",
    accept: "issue",
    group: column,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      description: description,
      status: column,
      priority: priority,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const issue: Issue = {
      id,
      description: data.description,
      priority: data.priority,
      status: data.status,
      title: data.title,
    };
    onUpdateIssue(issue);
    form.reset();
    setOpen(false);
  };

  return (
    <div
      ref={ref}
      data-dragging={isDragging}
      className="bg-card rounded-lg p-4 border-border border flex flex-col cursor-grab z-40 hover:cursor-pointer"
    >
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogFormContent title={column} form={form} onSubmit={onSubmit} />
      </Dialog>
      <div className="flex justify-between items-center">
        <Badge
          variant={`${priority === "High" ? "destructive" : priority === "Medium" ? "warning" : "success"}`}
          className="rounded-sm"
        >
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant={"ghost"}>
                <Ellipsis />
              </Button>
            }
          />
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setOpen(!open)}>
              <Edit />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => onDeleteIssue(id)}
            >
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-2 py-4">
        <div className="font-bold">{title}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex justify-between border-t border-border py-3">
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex gap-2 items-center text-muted-foreground">
          <Calendar size={20} />
          <span className="text-sm">Sep 9, 2026</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
