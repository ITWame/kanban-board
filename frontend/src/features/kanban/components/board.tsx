import { useEffect, useState } from "react";
import Column from "./column";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { STATUS_CONFIG } from "../configs/status";
import useGetIssues from "../hooks/use-get-issues";
import { Issue } from "../types/issue";
import useAddIssue from "../hooks/use-add-issue";

function Board() {
  const [issues, setIssues] = useState<Record<string, Issue[]>>();

  const { data } = useGetIssues();
  const addIssue = useAddIssue();

  useEffect(() => {
    if (data.data) {
      const initialData = data.data.reduce(
        (column, issue) => {
          if (column[issue.status] == null) {
            column[issue.status] = [];
          }

          column[issue.status].push(issue);
          return column;
        },
        { "to do": [], "in progress": [], review: [], done: [] } as Record<
          string,
          Issue[]
        >,
      );

      setIssues(initialData);
    }
  }, [data]);

  if (issues) {
    return (
      <DragDropProvider
        onDragOver={(event) => {
          setIssues((prevIssues) => {
            if (!prevIssues) return prevIssues;
            return move(prevIssues, event) as Record<string, Issue[]>;
          });
        }}
      >
        <div className="grid grid-cols-4 gap-4 p-6 flex-1 min-h-0 overflow-x-auto">
          {Object.entries(issues).map(([column, issues]) => (
            <Column
              key={STATUS_CONFIG[column].title}
              borderColor={STATUS_CONFIG[column].color}
              title={STATUS_CONFIG[column].title}
              id={column}
              issues={issues}
              onAddIssue={async (data) => addIssue.mutateAsync(data)}
            />
          ))}
        </div>
      </DragDropProvider>
    );
  }
}

export default Board;
