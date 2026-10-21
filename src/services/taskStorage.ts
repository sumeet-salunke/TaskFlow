import type { Task } from "../types/task";
const STORAGE_KEY = "taskflow-tasks";

export const saveTasks= (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const loadTasks = (): Task[] => {
  const tasks = localStorage.getItem(STORAGE_KEY);
  if(!tasks) return [];
  const parsedTasks = JSON.parse(tasks);
  return parsedTasks;
}