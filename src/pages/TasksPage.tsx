import { useState } from "react";
import type { Task } from "../types/task";
import { loadTasks } from "../services/taskStorage";

function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>(()=> loadTasks());
// ()=> loadtasks() is clled lazy state initalizer

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
              </article>
            ))}
        </section>
      )}
    </main>
  )
}

export default TaskPage;