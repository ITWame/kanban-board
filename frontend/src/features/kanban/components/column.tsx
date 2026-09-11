import { Button } from "@/src/components/ui/button";
import { EllipsisIcon, PlusIcon } from "lucide-react";
import Card from "./card";
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/src/components/ui/dialog";

interface ColumnProps {
  id: string;
  borderColor: string;
  title: string;
  tasks: Task[];
}

function Column({ tasks, borderColor, title, id }: ColumnProps) {
  const { ref } = useDroppable({
    id,
    type: "column",
    accept: "task",
    collisionPriority: CollisionPriority.High,
  });

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
          <span className="text-sm">{tasks.length}</span>
        </div>
        <Button variant={"ghost"}>
          <EllipsisIcon />
        </Button>
      </div>
      {tasks.map((task, index) => (
        <>
          <Card
            key={task.id}
            id={task.id}
            index={index}
            title={task.title}
            priority={task.priority}
            description={task.description}
          />
        </>
      ))}
    </div>
  );
}

export default Column;
