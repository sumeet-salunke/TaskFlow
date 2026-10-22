import { useState } from "react";
import type { Task } from "../types/task";
import { loadTasks, saveTasks } from "../services/taskStorage";
import { Link } from "react-router-dom";

function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>(()=> loadTasks());
// ()=> loadtasks() is clled lazy state initalizer

const handleDeleteTask = (taskId: string) =>{
  const filteredTasks = tasks.filter((item)=> item.id!==taskId);
  saveTasks(filteredTasks);
  setTasks(filteredTasks);
}

  return (
    <main className="container task-page">
      <h1>My Tasks</h1>
      <p>Manage your tasks and track your progress</p>
      {/* tasks will be rendered here*/ }
      {tasks.length === 0 ? (
        <section className="empty-state">
      <h2>No tasks yet</h2>
      <p>Your tasks will appear here once you create one</p>
      </section>
      ):(
        <section className="task-list">
            {tasks.map((task)=> (

              <article className="task-card" key={task.id}>
                <div className="task-card-header">
                  <h2>{task.title}</h2>
                  <span className={`status status-${task.status}`} >
                    {task.status}
                  </span>
                </div>
                <p>{task.description || 'NO description Provided'}</p>
                <div className="task-card-meta">
                  <span>Priority: {task.priority}</span>
                  <span>
                    Updated: {new Date(task.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="task-card-actions">
                  <Link className="button button-ptimary" to={`/tasks/${task.id}/edit`}>Edit</Link>
                </div>
                <div className="task-card-actions">
                  <button 
                  type='button' className="button"
                  onClick={ () => {
                    const yes = window.confirm('Are you sure want to delete this task?');

                    if(yes){
                     handleDeleteTask(task.id)}}
                    }>Delete</button>
                </div>
              </article>
            ))}
        </section>
      )}
    </main>
  )
}

export default TaskPage;