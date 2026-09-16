import z from "zod";

export const formSchema = z.object({
    title: z.string().nonempty("Title cannot be empty."),
    description: z.string().nonempty("Description cannot be empty."),
    status: z.string().min(1, "Please select a priority for the issue"),
    priority: z.string().min(1, "Please select a priority for the issue")
})