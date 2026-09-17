import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UUID } from "node:crypto";
import { Issue } from "../types/issue";

function useUpdateIssue() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (updatedIssue: Issue) => axios.put(`http://localhost:5227/api/issue/${updatedIssue.id}`, {
            priority: updatedIssue.priority,
            status: updatedIssue.status,
            title: updatedIssue.title,
            description: updatedIssue.description
        }),
         onMutate: async (updatedIssue: Issue) => {
            await queryClient.cancelQueries({queryKey: ["issues"]})

            const previusIssues = queryClient.getQueryData<Issue[]>(['issues'])

            if(previusIssues) {
                queryClient.setQueryData(['issues'], (old: {data: Issue[]})=> old.data.map((item) => item.id === updatedIssue.id ? {...item, priority: updatedIssue.priority, status: updatedIssue.status, title: updatedIssue.title, description: updatedIssue.description} : item))
            }

            return {previusIssues}
        },
        onError: (_err, _variables, context) => {
            if(context?.previusIssues) {
                queryClient.setQueryData<Issue[]>(['issues'], context.previusIssues)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['issues']})
        }
    })
}

export default useUpdateIssue;