import { Link, useParams } from 'react-router-dom';
import { loadTasks } from '../services/taskStorage';
import type { Task } from '../types/task';

function TaskDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const tasks: Task[] = loadTasks();
  const detailedTask = tasks.find((task) => task.id === id);

  if (!detailedTask) {
    return (
      <main className="container missing-task-state">
        <h1>No task found</h1>
        <p>This task does not exist or may have been deleted.</p>
        <Link to="/tasks" className="button button-secondary">Back to tasks</Link>
      </main>
    );
  }

  const statusLabel = detailedTask.status === 'in-progress' ? 'In progress' : detailedTask.status;

  return (
    <main className="container task-details-page">
      <div className="task-details-card">
        <span className="eyebrow">TASK DETAILS</span>
        <h1>{detailedTask.title}</h1>
        <p className="detail-description">{detailedTask.description || 'No description provided.'}</p>

        <dl className="detail-grid">
          <div className="detail-item">
            <dt>Status</dt>
            <dd><span className={`status status-${detailedTask.status}`}>{statusLabel}</span></dd>
          </div>
          <div className="detail-item">
            <dt>Priority</dt>
            <dd><span className={`priority priority-${detailedTask.priority}`}>{detailedTask.priority}</span></dd>
          </div>
          <div className="detail-item">
            <dt>Created</dt>
            <dd>{new Date(detailedTask.createdAt).toLocaleString()}</dd>
          </div>
          <div className="detail-item">
            <dt>Last updated</dt>
            <dd>{new Date(detailedTask.updatedAt).toLocaleString()}</dd>
          </div>
        </dl>

        <div className="detail-actions">
          <Link to="/tasks" className="button button-secondary">Back to tasks</Link>
          <Link to={`/tasks/${detailedTask.id}/edit`} className="button button-primary">Edit task</Link>
        </div>
      </div>
    </main>
  );
}

export default TaskDetailsPage;
