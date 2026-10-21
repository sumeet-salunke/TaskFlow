import {z} from "zod";

export const taskSchema = z.object( {
  title: z.string()
  .trim().min(3, "Title must be at least 3 characters").max(120, "Title cannot exceed 120 characters")
  ,
  description : z.string().trim().max(200, "Description cannot exceed 200 characters"),
  status: z.enum(["pending","in-progress","completed"]).default("pending"),
  priority:  z.enum(["low","medium","high"]).default("medium"),
});

//z.infer<typeof taskSchema> derives the TypeScript type from the schema, so you don't have to maintain a separate interface for the same fields.

export type TaskFormValues = z.infer<typeof taskSchema>;