import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Calendar, Ellipsis } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";
import { UUID } from "node:crypto";

interface CardProps {
  id: UUID;
  index: number;
  priority: string;
  title: string;
  description: string;
}

function Card({ priority, title, description, id, index }: CardProps) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "issue",
    accept: "issue",
    group: "column",
  });

  return (
    <div
      ref={ref}
      data-dragging={isDragging}
      className="bg-card rounded-lg p-4 border-border border flex flex-col cursor-grab z-40"
    >
      <div className="flex justify-between items-center">
        <Badge variant="destructive" className="rounded-sm">
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Badge>
        <Button variant={"ghost"}>
          <Ellipsis />
        </Button>
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
