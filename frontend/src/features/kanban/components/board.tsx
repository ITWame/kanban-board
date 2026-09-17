import { useEffect, useState } from "react";
import Column from "./column";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { STATUS_CONFIG } from "../configs/status";
import useGetIssues from "../hooks/use-get-issues";
import { Issue } from "../types/issue";
import useAddIssue from "../hooks/use-add-issue";
import useUpdateStatus from "../hooks/use-update-status";
import { isSortable } from "@dnd-kit/react/sortable";
import { UUID } from "node:crypto";
import useDeleteIssue from "../hooks/use-delete-issue";
import useUpdateIssue from "../hooks/use-update-issue";
import { id } from "zod/v4/locales";

function Board() {
  const [issues, setIssues] = useState<Record<string, Issue[]>>();

  const { data } = useGetIssues();

  const addIssue = useAddIssue();
  const updateIssue = useUpdateIssue();
  const updateStatus = useUpdateStatus();
  const deleteIssue = useDeleteIssue();

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
        { "To Do": [], "In Progress": [], Review: [], Done: [] } as Record<
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
        onDragEnd={async ({ operation }) => {
          const { source } = operation;
          if (source) {
            if (isSortable(source)) {
              if (source.id && source.group) {
                await updateStatus.mutateAsync({
                  id: source.id.toString() as UUID,
                  status: source.group?.toString(),
                });
              }
            }
          }
        }}
      >
        <div className="grid grid-cols-4 gap-4 p-6 flex-1 min-h-0 overflow-x-auto">
          {Object.entries(issues).map(([column, issues]) => (
            <Column
              key={STATUS_CONFIG[column].title}
              title={STATUS_CONFIG[column].title}
              column={column}
              borderColor={STATUS_CONFIG[column].color}
              id={column}
              issues={issues}
              onAddIssue={async (data) => await addIssue.mutateAsync(data)}
              onDeleteIssue={async (id) => await deleteIssue.mutateAsync(id)}
              onUpdateIssue={async (updatedIssue) =>
                updateIssue.mutateAsync(updatedIssue)
              }
            />
          ))}
        </div>
      </DragDropProvider>
    );
  }
}

export default Board;
