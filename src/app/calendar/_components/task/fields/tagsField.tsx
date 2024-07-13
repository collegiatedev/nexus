"use client";

import React, { useEffect, useRef, useState } from "react";
import { type TaskFields, FieldFormat } from "./fieldsTable";
import { TaskTag } from "~/components/taskTag";
import { TaskTagTypes } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { syncTaskTags } from "~/app/actions";
import { useDebouncedCallback } from "use-debounce";

export const TagsField = ({ task }: TaskFields) => {
  const tags = task.taskTags.map((tag) => tag.type);

  return (
    <FieldFormat label="Tags" taskId={task.id}>
      <TagFieldPicker tags={tags} taskId={task.id} />
    </FieldFormat>
  );
};

const TagFieldPicker = ({
  tags,
  taskId,
}: {
  tags: TaskTagTypes[];
  taskId: number;
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<TaskTagTypes[]>(tags);
  const triggerRef = useRef<HTMLDivElement>(null);

  const remainingTags = React.useMemo(() => {
    const allTags = Object.values(TaskTagTypes);
    return allTags.filter((tag) => !selectedTags.includes(tag));
  }, [selectedTags]);

  const debouncedUpdateTags = useDebouncedCallback(async () => {
    await syncTaskTags(taskId, selectedTags);
  }, 200);
  useEffect(() => {
    debouncedUpdateTags();
  }, [selectedTags, debouncedUpdateTags]);

  return (
    <Popover open={isPopoverOpen}>
      <PopoverTrigger asChild>
        <div
          ref={triggerRef}
          className="flex flex-wrap gap-3"
          onClick={() => setIsPopoverOpen(true)}
        >
          {!!selectedTags.length ? (
            selectedTags.map((tag) => (
              <TaskTag
                key={`${taskId}-${tag}`}
                type={tag}
                showDelete={isPopoverOpen}
                onDelete={async (type) =>
                  setSelectedTags(selectedTags.filter((t) => t !== type))
                }
              />
            ))
          ) : (
            <p className="cursor-default text-left font-light opacity-50">
              Empty
            </p>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent
        className={`${!remainingTags.length && "hidden"}`}
        align="start"
        onOpenAutoFocus={(event) => event.preventDefault()}
        onInteractOutside={(event: any) => {
          // If the click was inside the PopoverTrigger, do not close the popover
          const trigger = triggerRef.current;
          if (trigger && trigger.contains(event.target)) return;
          setIsPopoverOpen(false);
        }}
      >
        <Table>
          <TableBody>
            {remainingTags.map((tag) => (
              <TableRow
                key={tag}
                // desynced with fieldsTable.tsx
                className="border-hidden hover:bg-muted/50"
                onClick={() => setSelectedTags([...selectedTags, tag])}
              >
                <TableCell className="p-2">
                  <TaskTag type={tag} showDelete={false} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PopoverContent>
    </Popover>
  );
};
