import { cva } from 'class-variance-authority';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useDndContext } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IconGripVertical } from '@tabler/icons-react';

import { ColumnActions } from './column-action';
import { TaskCard } from './task-card';

import type { Task } from "../utils/store";

import type { UniqueIdentifier } from "@dnd-kit/core";

export interface Column {
  id: UniqueIdentifier;
  title: string;
}

export interface ColumnDragData {
  column: Column;
  type: ColumnType;
}

export type ColumnType = "Column";

interface BoardColumnProps {
  column: Column;
  isOverlay?: boolean;
  tasks: Task[];
}

export function BoardColumn({ column, isOverlay, tasks }: BoardColumnProps) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    attributes: {
      roleDescription: `Column: ${column.title}`,
    },
    data: {
      column,
      type: "Column",
    } satisfies ColumnDragData,
    id: column.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const variants = cva(
    "h-[75vh] max-h-[75vh] w-[350px] max-w-full bg-secondary flex flex-col shrink-0 snap-center",
    {
      variants: {
        dragging: {
          default: "border-2 border-transparent",
          over: "ring-2 opacity-30",
          overlay: "ring-2 ring-primary",
        },
      },
    }
  );

  return (
    <Card
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
      ref={setNodeRef}
      style={style}
    >
      <CardHeader className="space-between flex flex-row items-center border-b-2 p-4 text-left font-semibold">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="text-primary/50 relative -ml-2 h-auto cursor-grab p-1"
        >
          <span className="sr-only">{`Move column: ${column.title}`}</span>
          <IconGripVertical />
        </Button>
        {/* <span className="mr-auto mt-0!"> {column.title}</span> */}
        {/* <Input
          defaultValue={column.title}
          className="text-base mt-0! mr-auto"
        /> */}
        <ColumnActions id={column.id} title={column.title} />
      </CardHeader>
      <CardContent className="flex grow flex-col gap-4 overflow-x-hidden p-2">
        <ScrollArea className="h-full">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext();

  const variations = cva("px-2  pb-4 md:px-0 flex lg:justify-start", {
    variants: {
      dragging: {
        active: "snap-none",
        default: "",
      },
    },
  });

  return (
    <ScrollArea className="w-full rounded-md whitespace-nowrap">
      <div
        className={variations({
          dragging: dndContext.active ? "active" : "default",
        })}
      >
        <div className="flex flex-row items-start justify-center gap-4">
          {children}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
