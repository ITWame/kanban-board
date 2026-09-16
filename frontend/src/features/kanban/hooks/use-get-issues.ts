import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Issue } from "../types/issue";
import axios from "axios";

function useGetIssues() {
    return useSuspenseQuery<{data: Issue[]}>({
        queryKey: ["issues"],
        queryFn: () => axios.get("http://localhost:5227/api/issue", {headers: {"Access-Control-Allow-Origin": "*"}})
    })
}

export default useGetIssues;