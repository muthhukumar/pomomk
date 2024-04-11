import * as React from "react";
import { generateUUID } from "..";

export type TaskType = {
  id: string;
  title: string;
  completed: boolean;
  duration: string;
  active: boolean;
};

type TasksContextType = {
  tasks: Array<TaskType>;
  addTask: (payload: {
    duration?: string;
    title: string;
    active: boolean;
  }) => void;
  toggleTask: (payload: { taskId: string; completed: boolean }) => void;
  removeTask: (taskId: string) => void;
  setTitle: (payload: { title: string; taskId: TaskType["id"] }) => void;
  setDuration: (payload: { duration: string; taskId: TaskType["id"] }) => void;
};

const TasksContext = React.createContext<TasksContextType>({
  tasks: [],
  addTask: () => undefined,
  toggleTask: () => undefined,
  removeTask: () => undefined,
  setTitle: () => undefined,
  setDuration: () => undefined,
});

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = React.useState<Array<TaskType>>([]);

  function addTask({
    active,
    duration,
    title,
  }: {
    duration?: string;
    title: string;
    active: boolean;
  }) {
    setTasks((state) => {
      const tasks = [...state];

      tasks.push({
        active,
        id: generateUUID(),
        completed: false,
        title,
        duration: duration || "25m",
      });

      return tasks;
    });
  }

  function setTitle({
    title,
    taskId,
  }: {
    title: string;
    taskId: TaskType["id"];
  }) {
    setTasks((state) => {
      const tasks = [...state];
      const index = tasks.findIndex((t) => t.id === taskId);

      if (tasks[index]) tasks[index].title = title;

      return tasks;
    });
  }

  function setDuration({
    duration,
    taskId,
  }: {
    duration: string;
    taskId: TaskType["id"];
  }) {
    setTasks((state) => {
      const tasks = [...state];
      const index = tasks.findIndex((t) => t.id === taskId);

      if (tasks[index]) tasks[index].duration = duration;

      return tasks;
    });
  }

  function toggleTask({
    taskId,
    completed,
  }: {
    taskId: TaskType["id"];
    completed: boolean;
  }) {
    setTasks((state) => {
      const tasks = [...state];
      const task = tasks.find((t) => t.id === taskId);
      const index = tasks.findIndex((t) => t.id === taskId);

      if (task) {
        task.completed = completed;
      }

      if (tasks[index] && task) tasks[index] = task;

      return tasks;
    });
  }

  function removeTask(taskId: TaskType["id"]) {
    setTasks((state) => {
      const tasks = [...state];

      return tasks.filter((t) => t.id !== taskId);
    });
  }

  return (
    <TasksContext.Provider
      value={{ setTitle, tasks, addTask, toggleTask, removeTask, setDuration }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = React.useContext(TasksContext);

  if (!context) {
    console.warn(`useTasks should be used inside TasksProvider`);
  }

  return context;
}
