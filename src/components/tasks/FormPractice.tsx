import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, type TaskFormValues } from "../../validations/taskSchema";




function FormPractice() {
const {
  register, handleSubmit, formState: {errors},
}= useForm<TaskFormValues>({
  resolver: zodResolver(taskSchema),
  defaultValues: {
    title: '',
    description:'',
  },
});
const onSubmit = (data: TaskFormValues) => {
  console.log("Valid form data: ",data);
}

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div>
      <label htmlFor="title">Task Title</label>
      <input id='title' {...register("title", {
        required: "Task title is required",
        minLength: {
          value: 3,
          message: "Title musr contain atleast three characters",
        },
      })} />
      {errors.title && <p>{errors.title.message}</p>}
    </div>
    <div>
      <label htmlFor="description">
        Description
      </label>
      <input id='description' {...register("description", {
        maxLength: {
          value: 200
,
message: "Description cannot exceed 200 charcaters",        }
      })}
       />
       {errors.description && <p>{errors.description.message}</p>}
    </div>
    <button type='submit'>Submit</button>
  </form>
)


}

export default FormPractice;


{/**
  required prevents submission when the title is empty.

minLength requires at least three characters.

maxLength limits the description to 200 characters.

errors.title contains the title's validation error, if any.

handleSubmit(onSubmit) calls onSubmit only after validation succeeds. */}