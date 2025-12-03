import type { ColumnDragData } from "../components/board-column";
import type { TaskDragData } from "../components/task-card";

import type { Active, DataRef, Over } from "@dnd-kit/core";

type DraggableData = ColumnDragData | TaskDragData;

export function hasDraggableData<T extends Active | Over>(
  entry: null | T | undefined
): entry is {
  data: DataRef<DraggableData>;
} & T {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  if (data?.type === "Column" || data?.type === "Task") {
    return true;
  }

  return false;
}
