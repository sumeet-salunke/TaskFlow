import { Link, useParams } from "react-router-dom";
import { loadTasks } from "../services/taskStorage";
import type { Task } from "../types/task";
import TaskForm from "../components/tasks/TaskForm";
import { useNavigate } from "react-router-dom";
import { saveTasks } from "../services/taskStorage";


function EditTaskPage () {
  const navigate = useNavigate();

  const {id} = useParams<{id: string}>();
  const tasks: Task[] = loadTasks();
  const task = tasks.find((item) => item.id === id);
if(!task){
  return (
    <main className="container missing-task-state">
      <h1>Task not found</h1>
      <p>This task does not exist or may have been deleted.</p>
      <Link to="/tasks" className="button button-secondary">Back to tasks</Link>
    </main>
  )
}

const handleUpdateTask = (data: Omit<Task,'id'|'createdAt'|'updatedAt'>) => {
  const updatedTask: Task = {...task,
    ...data,
    updatedAt: new Date().toISOString(),
  }
{/*
  ...task preserves the original task's ID and creation date.

...data replaces the editable fields with the submitted values.

updatedAt records when the task was modified.

.map() replaces only the matching task and preserves every other task.

saveTasks() persists the updated list.

navigate('/tasks') returns you to the task list. */}
  const updatedTasks= tasks.map((item)=> 
  item.id === task.id? updatedTask: item);
  saveTasks(updatedTasks);
  navigate("/tasks");
}

  return <>
    <main className="container task-editor-page">
    <h1>Edit task</h1>
    <TaskForm 
    onSubmit={handleUpdateTask} 
    submitLabel="Save Changes"
    cancelHref="/tasks"
    initialValues={{
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    }}/>
  </main>
  </>


}

export default EditTaskPage;
