import type { Task } from "../types/task";

const STORAGE_KEY = "taskflow-tasks";
const INVALID_DATA_BACKUP_KEY = "taskflow-tasks-invalid-backup";

const isTask = (value: unknown): value is Task => {
  if (!value || typeof value !== "object") return false;

  const task = value as Record<string, unknown>;
  return (
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    typeof task.description === "string" &&
    (task.status === "pending" ||
      task.status === "in-progress" ||
      task.status === "completed") &&
    (task.priority === "low" ||
      task.priority === "medium" ||
      task.priority === "high") &&
    typeof task.createdAt === "string" &&
    typeof task.updatedAt === "string"
  );
};

const preserveInvalidData = (rawValue: string): void => {
  try {
    if (!localStorage.getItem(INVALID_DATA_BACKUP_KEY)) {
      localStorage.setItem(INVALID_DATA_BACKUP_KEY, rawValue);
    }
  } catch {
    // Storage may be unavailable in privacy-restricted browser contexts.
  }
};

export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    console.error("TaskFlow could not save tasks to local storage.");
  }
};

export const loadTasks = (): Task[] => {
  let rawTasks: string | null;

  try {
    rawTasks = localStorage.getItem(STORAGE_KEY);
  } catch {
    console.error("TaskFlow could not access local storage.");
    return [];
  }

  if (!rawTasks) return [];

  try {
    const parsedTasks: unknown = JSON.parse(rawTasks);

    if (!Array.isArray(parsedTasks)) {
      preserveInvalidData(rawTasks);
      console.warn("TaskFlow ignored invalid stored task data.");
      return [];
    }

    const validTasks = parsedTasks.filter(isTask);
    if (validTasks.length !== parsedTasks.length) {
      preserveInvalidData(rawTasks);
      console.warn("TaskFlow ignored invalid stored task entries.");
    }

    return validTasks;
  } catch {
    preserveInvalidData(rawTasks);
    console.warn("TaskFlow ignored malformed stored task data.");
    return [];
  }
};
