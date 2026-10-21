
import { useNavigate } from 'react-router-dom';

import TaskForm from '../components/tasks/TaskForm';
import { loadTasks, saveTasks } from '../services/taskStorage';
import type { Task } from '../types/task';

function AddTaskPage() {
  const navigate = useNavigate();

  const handleCreateTask = (
    data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>,
  ) => {
    const now = new Date().toISOString();

    const newTask: Task = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    const existingTasks = loadTasks();
    saveTasks([...existingTasks, newTask]);

    navigate('/tasks');
  };

  return (
    <main className="container task-editor-page">
      <div className="page-heading">
        <span className="eyebrow">TASK MANAGEMENT</span>
        <h1>Create a task</h1>
        <p>Capture the work you want to get done.</p>
      </div>

      <section className="form-panel">
        <TaskForm
          onSubmit={handleCreateTask}
          submitLabel="Create task"
        />
      </section>
    </main>
  );
}

export default AddTaskPage;
