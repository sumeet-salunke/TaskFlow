
import { useState } from "react";
import type { Task, TaskStatus, TaskPriority } from "../types/task";
import { loadTasks, saveTasks } from "../services/taskStorage";
import { Link } from "react-router-dom";

function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  // Lazy state initializer: loadTasks() runs to initialize the state.

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "all">(
    "all",
  );

  const [prioritySort, setPrioritySort] = useState<
    "all" | "high-to-low" | "low-to-high"
  >("all");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const priorityRank: Record<TaskPriority, number> = {
    high: 3,
    medium: 2,
    low: 1,
  };

 // Search and filter tasks.
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || task.status === statusFilter) &&
      (priorityFilter === "all" || task.priority === priorityFilter),
  );


  // Sort the filtered tasks by priority.
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (prioritySort === "all") {
      return 0;
    }

    if (prioritySort === "high-to-low") {
      return priorityRank[b.priority] - priorityRank[a.priority];
    }

    return priorityRank[a.priority] - priorityRank[b.priority];
  });


  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(sortedTasks.length / itemsPerPage));
  const effectivePage = Math.min(currentPage, totalPages);
  const startIndex = (effectivePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTasks = sortedTasks.slice(startIndex, endIndex);
  const startItem = sortedTasks.length === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(endIndex, sortedTasks.length);
  const totalItems = sortedTasks.length;

 

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    saveTasks(updatedTasks);
    setTasks(updatedTasks);
  };
  return (
    <main className="container tasks-page">
      <h1>My Tasks</h1>
      <p>Manage your tasks and track your progress</p>

      <div className="task-controls">
        <div className="control-field control-field-search">
          <label htmlFor="task-search">Search tasks</label>
          <input
            id="task-search"
            type="text"
            placeholder="Search tasks by title"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="control-field">
          <label htmlFor="status-filter">Status</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value as TaskStatus | "all");
              setCurrentPage(1);
            }}
          >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          </select>
        </div>
        <div className="control-field">
          <label htmlFor="priority-filter">Priority</label>
          <select
            id="priority-filter"
            value={priorityFilter}
            onChange={(event) => {
              setPriorityFilter(event.target.value as TaskPriority | "all");
              setCurrentPage(1);
            }}
          >
          <option value="all">All priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          </select>
        </div>
        <div className="control-field">
          <label htmlFor="priority-sort">Sort</label>
          <select
            id="priority-sort"
            value={prioritySort}
            onChange={(event) => {
              setPrioritySort(
                event.target.value as
                  | "all"
                  | "high-to-low"
                  | "low-to-high",
              );
              setCurrentPage(1);
            }}
          >
          <option value="all">Default order</option>
          <option value="high-to-low">Priority: High to Low</option>
          <option value="low-to-high">Priority: Low to High</option>
          </select>
        </div>
      </div>

      {/* Empty states and task list */}
      {tasks.length === 0 ? (
        <section className="empty-state">
          <h2>No tasks yet</h2>
          <p>Your tasks will appear here once you create one.</p>
        </section>
      ) : paginatedTasks.length === 0 ? (
        <section className="empty-state">
          <h2>No matching tasks</h2>
          <p>No tasks match your search or filters. Try changing them.</p>
        </section>
      ) : (
        <>
          <section className="task-list">
          {paginatedTasks.map((task) => (
            <article className="task-card" key={task.id}>
              <div className="task-card-header">
                <h2>{task.title}</h2>
                  <span className={`status status-${task.status}`}>
                  {task.status === 'in-progress' ? 'In progress' : task.status}
                </span>
              </div>

              <p>{task.description || "No description provided"}</p>

              <div className="task-card-meta">
                <span>Priority: <strong className={`priority priority-${task.priority}`}>{task.priority}</strong></span>
                <span>
                  Updated: {new Date(task.updatedAt).toLocaleDateString()}
                </span>
              </div>

              <div className="task-card-actions">
                <Link
                  className="button button-primary"
                  to={`/tasks/${task.id}/edit`}
                >
                  Edit
                </Link>

                <button
                  type="button"
                  className="button button-danger"
                  onClick={() => {
                    const confirmed = window.confirm(
                      "Are you sure you want to delete this task?",
                    );

                    if (confirmed) {
                      handleDeleteTask(task.id);
                    }
                  }}
                >
                  Delete
                </button>
                <Link className="button button-secondary" to={`/tasks/${task.id}`}>View details</Link>
              </div>
            </article>
          ))}
          </section>
          <div className="pagination-toolbar">
            <p className="pagination-info">
              Showing {startItem}–{endItem} of {totalItems} tasks
            </p>
            <div className="page-size-control">
              <label htmlFor="pageSize">Tasks per page</label>
              <select id="pageSize"
              value={itemsPerPage}
              onChange={(event)=> {
                setItemsPerPage(Number(event.target.value));
                setCurrentPage(1);
              }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
          <div className="pagination">
            <button type="button"
            disabled={effectivePage===1}
            onClick={() => setCurrentPage((page)=> Math.max(1, page - 1))}>Previous</button>
            <span>
              Page {effectivePage} of {totalPages}
            </span>
            <button 
            type="button"
            disabled={effectivePage===totalPages}
            onClick={() => setCurrentPage((page)=> Math.min(totalPages, page + 1))}>Next</button>
          </div>
        </>
      )}
    </main>
  );
}

export default TaskPage;



//startIndex = (currentPage - 1) * itemsPerPage
//endIndex = startIndex + itemsPerPage
//slice(start, end) -> start is included, end id excluded
