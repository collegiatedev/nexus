"use client";

import React, { useState } from "react";
import { type TaskFields, FieldFormat } from "./fieldsTable";
import { TaskTag } from "~/components/taskTag";
import { TaskTagTypes } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { deleteTaskTag } from "~/app/actions";

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

  const remainingTags = React.useMemo(() => {
    const allTags = Object.values(TaskTagTypes);
    return allTags.filter((tag) => !selectedTags.includes(tag));
  }, [selectedTags]);

  return (
    <Popover onOpenChange={setIsPopoverOpen} modal>
      <PopoverTrigger asChild>
        <div className="flex flex-wrap gap-3">
          {!!selectedTags.length ? (
            selectedTags.map((tag) => (
              <TaskTag
                key={`${taskId}-${tag}`}
                type={tag}
                taskId={taskId}
                // showDelete={isPopoverOpen}
                showDelete={true}
                onDelete={async (taskId, type) => {
                  setSelectedTags(selectedTags.filter((t) => t !== type));
                  if (tags.includes(type)) await deleteTaskTag(taskId, type);
                }}
              />
            ))
          ) : (
            <p className="cursor-default text-left font-light opacity-50">
              Empty
            </p>
          )}
        </div>
      </PopoverTrigger>
      {remainingTags.length > 0 && (
        <PopoverContent align="start">
          <Table>
            <TableBody>
              {remainingTags.map((tag) => (
                <TableRow
                  key={tag}
                  className="border-hidden hover:bg-muted/50"
                  onClick={() => {
                    setSelectedTags([...selectedTags, tag]);
                  }}
                >
                  <TableCell className="p-2">
                    {/* <TaskTag type={tag} taskId={1} /> */}
                    {tag}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </PopoverContent>
      )}
    </Popover>
  );
};
