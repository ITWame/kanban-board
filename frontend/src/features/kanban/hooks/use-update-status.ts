import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Issue } from "../types/issue";
import axios from "axios";

function useUpdateStatus() {
const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (updatedIssue: Pick<Issue, "status" | "id">) => axios.patch(`http://localhost:5227/api/issue/${updatedIssue.id}/status`, {status: updatedIssue.status}),

        onMutate: async (updatedIssue: Pick<Issue, "status" | "id">) => {
            await queryClient.cancelQueries({queryKey: ["issues"]})

            const previusIssues = queryClient.getQueryData<Issue[]>(['issues'])

            if(previusIssues) {
                queryClient.setQueryData(['issues'], (old: {data: Issue[]})=> old.data.map((item) => item.id === updatedIssue.id ? {...item, status: updatedIssue.status} : item))
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

export default useUpdateStatus;