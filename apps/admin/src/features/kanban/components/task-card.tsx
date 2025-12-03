import { cva } from 'class-variance-authority';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IconGripVertical } from '@tabler/icons-react';

import type { Task } from "../utils/store";

// export interface Task {
//   id: UniqueIdentifier;
//   columnId: ColumnId;
//   content: string;
// }

export interface TaskDragData {
  task: Task;
  type: TaskType;
}

export type TaskType = "Task";

interface TaskCardProps {
  isOverlay?: boolean;
  task: Task;
}

export function TaskCard({ isOverlay, task }: TaskCardProps) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    attributes: {
      roleDescription: "Task",
    },
    data: {
      task,
      type: "Task",
    } satisfies TaskDragData,
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const variants = cva("mb-2", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  return (
    <Card
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
      ref={setNodeRef}
      style={style}
    >
      <CardHeader className="space-between border-secondary relative flex flex-row border-b-2 px-3 py-3">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="text-secondary-foreground/50 -ml-2 h-auto cursor-grab p-1"
        >
          <span className="sr-only">Move task</span>
          <IconGripVertical />
        </Button>
        <Badge className="ml-auto font-semibold" variant={"outline"}>
          Task
        </Badge>
      </CardHeader>
      <CardContent className="px-3 pt-3 pb-6 text-left whitespace-pre-wrap">
        {task.title}
      </CardContent>
    </Card>
  );
}
