import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Column } from "../components/board-column";

import type { UniqueIdentifier } from "@dnd-kit/core";

export type Status = "DONE" | "IN_PROGRESS" | "TODO";

const defaultCols = [
  {
    id: "TODO" as const,
    title: "Todo",
  },
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]["id"];

export type State = {
  columns: Column[];
  draggedTask: null | string;
  tasks: Task[];
};

export type Task = {
  description?: string;
  id: string;
  status: Status;
  title: string;
};

const initialTasks: Task[] = [
  {
    id: "task1",
    status: "TODO",
    title: "Project initiation and planning",
  },
  {
    id: "task2",
    status: "TODO",
    title: "Gather requirements from stakeholders",
  },
];

export type Actions = {
  addCol: (title: string) => void;
  addTask: (title: string, description?: string) => void;
  dragTask: (id: null | string) => void;
  removeCol: (id: UniqueIdentifier) => void;
  removeTask: (title: string) => void;
  setCols: (cols: Column[]) => void;
  setTasks: (updatedTask: Task[]) => void;
  updateCol: (id: UniqueIdentifier, newName: string) => void;
};

export const useTaskStore = create<Actions & State>()(
  persist(
    (set) => ({
      addCol: (title: string) =>
        set((state) => ({
          columns: [
            ...state.columns,
            { id: state.columns.length ? title.toUpperCase() : "TODO", title },
          ],
        })),
      addTask: (title: string, description?: string) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { description, id: uuid(), status: "TODO", title },
          ],
        })),
      columns: defaultCols,
      draggedTask: null,
      dragTask: (id: null | string) => set({ draggedTask: id }),
      removeCol: (id: UniqueIdentifier) =>
        set((state) => ({
          columns: state.columns.filter((col) => col.id !== id),
        })),
      removeTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      setCols: (newCols: Column[]) => set({ columns: newCols }),
      setTasks: (newTasks: Task[]) => set({ tasks: newTasks }),
      tasks: initialTasks,
      updateCol: (id: UniqueIdentifier, newName: string) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === id ? { ...col, title: newName } : col
          ),
        })),
    }),
    { name: "task-store", skipHydration: true }
  )
);
