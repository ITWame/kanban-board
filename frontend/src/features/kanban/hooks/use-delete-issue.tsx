import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Issue } from "../types/issue";
import axios from "axios";
import { UUID } from "node:crypto";

function useDeleteIssue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: UUID) =>
      axios.delete(`http://localhost:5227/api/issue/${id}`),

    onMutate: async (id: UUID) => {
      await queryClient.cancelQueries({ queryKey: ["issues"] });

      const previusIssues = queryClient.getQueryData<Issue[]>(["issues"]);

      if (previusIssues) {
        queryClient.setQueryData(["issues"], (old: { data: Issue[] }) =>
          old.data.filter((item) => item.id !== id),
        );
      }

      return { previusIssues };
    },
    onError: (_err, _variables, context) => {
      if (context?.previusIssues) {
        queryClient.setQueryData<Issue[]>(["issues"], context.previusIssues);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });
}

export default useDeleteIssue;
