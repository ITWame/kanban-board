import { useState } from "react";
import Column from "./column";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { STATUS_CONFIG } from "../configs/status";

const DUMMY_DATA = {
  TODO: [
    {
      id: 1,
      status: "To Do",
      priority: "High",
      title: "Task 1",
      description:
        "Carousel and story visuals campaign theme. Carousel and story visuals campaign theme.",
    },
  ],
  "IN-PROGRESS": [
    {
      id: 2,
      status: "In Progress",
      priority: "High",
      title: "Task 1",
      description:
        "Carousel and story visuals campaign theme. Carousel and story visuals campaign theme.",
    },
  ],
  REVIEW: [
    {
      id: 3,
      status: "Review",
      priority: "High",
      title: "Task 1",
      description:
        "Carousel and story visuals campaign theme. Carousel and story visuals campaign theme.",
    },
    {
      id: 4,
      status: "Review",
      priority: "High",
      title: "Task 1",
      description:
        "Carousel and story visuals campaign theme. Carousel and story visuals campaign theme.",
    },
  ],
  DONE: [],
};

function Board() {
  const [tasks, setTasks] = useState(DUMMY_DATA);

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setTasks((tasks) => move(tasks, event));
      }}
    >
      <div className="grid grid-cols-4 gap-4 p-6 flex-1 min-h-0 overflow-x-auto">
        {Object.entries(tasks).map(([column, tasks]) => (
          <Column
            borderColor={STATUS_CONFIG[column].color}
            title={STATUS_CONFIG[column].title}
            id={column}
            tasks={tasks}
          />
        ))}
      </div>
    </DragDropProvider>
  );
}

export default Board;
