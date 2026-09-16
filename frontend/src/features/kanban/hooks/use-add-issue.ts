import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from 'axios'
import { Issue } from "../types/issue";

type newIssue = Omit<Issue, "id">

function useAddIssue() {
    const queryClient = useQueryClient()


    return useMutation({
        mutationFn: (newIssue: newIssue) => axios.post("http://localhost:5227/api/issue", newIssue),

        onMutate: async (newIssue: newIssue) => {
            await queryClient.cancelQueries({queryKey: ['issues']})


            const previusIssues = queryClient.getQueryData<Issue[]>(['issues'])

            const createdIssue: Issue = {
                id: crypto.randomUUID(),
                description: newIssue.description,
                priority: newIssue.priority.toLowerCase(),
                status: newIssue.status.toLowerCase(),
                title: newIssue.title
            }

            if(previusIssues) {
                queryClient.setQueryData(['issues'], (old: {data: Issue[]}) => old?.data.map((item) => item.id !== item.id ? item: createdIssue))
            }

            return {previusIssues}
        },
        onError: (err, variables, context) => {
            if(context?.previusIssues) {
                queryClient.setQueryData<Issue[]>(['issues'], context.previusIssues)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['issues']})
        }
    })
}

export default useAddIssue;