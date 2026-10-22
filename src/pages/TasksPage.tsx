
import { useState , useEffect} from "react";
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
  const itemPerPage = 5;
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex+ itemPerPage;

  const paginatedTasks = sortedTasks.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedTasks.length/ itemPerPage)

  const priorityRank: Record<TaskPriority, number> = {
    high: 3,
    medium: 2,
    low: 1,
  };

 

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    saveTasks(updatedTasks);
    setTasks(updatedTasks);
  };
  useEffect(()=> {
    setCurrentPage(1);
  },[searchTerm, statusFilter, priorityFilter, prioritySort]);
  useEffect(()=> {
    if(currentPage> totalPages && totalPages>0){
      setCurrentPage(totalPages);
    }
  },[currentPage, totalPages]);

  return (
    <main className="container task-page">
      <h1>My Tasks</h1>
      <p>Manage your tasks and track your progress</p>

      {/* Search */}
      <div className="task-search">
        <input
          type="text"
          placeholder="Search tasks by title"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      {/* Status filter */}
      <select
        value={statusFilter}
        onChange={(event) =>
          setStatusFilter(event.target.value as TaskStatus | "all")
        }
      >
        <option value="all">All statuses</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      {/* Priority filter */}
      <select
        value={priorityFilter}
        onChange={(event) =>
          setPriorityFilter(event.target.value as TaskPriority | "all")
        }
      >
        <option value="all">All priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Priority sorting */}
      <select
        value={prioritySort}
        onChange={(event) =>
          setPrioritySort(
            event.target.value as
              | "all"
              | "high-to-low"
              | "low-to-high",
          )
        }
      >
        <option value="all">Default order</option>
        <option value="high-to-low">Priority: High to Low</option>
        <option value="low-to-high">Priority: Low to High</option>
      </select>

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
        <section className="task-list">
          {paginatedTasks.map((task) => (
            <article className="task-card" key={task.id}>
              <div className="task-card-header">
                <h2>{task.title}</h2>
                <span className={`status status-${task.status}`}>
                  {task.status}
                </span>
              </div>

              <p>{task.description || "No description provided"}</p>

              <div className="task-card-meta">
                <span>Priority: {task.priority}</span>
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
                  className="button"
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
              </div>
            </article>
          ))}
          <div className="pagination">
            <button type="button"
            disabled={currentPage===1}
            onClick={() => setCurrentPage((page)=> page-1)}>Previous</button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button 
            type="button"
            disabled={currentPage===totalPages}
            onClick={() => setCurrentPage((page)=> page+1)}>Next</button>
          </div>
        </section>
      )}
    </main>
  );
}

export default TaskPage;



//startIndex = (currentPage - 1) * itemsPerPage
//endIndex = startIndex + itemsPerPage
//slice(start, end) -> start is included, end id excluded