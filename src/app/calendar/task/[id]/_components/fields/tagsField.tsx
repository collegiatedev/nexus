"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { type TaskFields, FieldFormat } from "./fieldsTable";
import { TaskTag } from "~/components/taskTag";

export const TagsField = ({ task }: TaskFields) => {
  return (
    <FieldFormat label="Tags" taskId={task.id} hovers={true}>
      <Popover>
        <PopoverTrigger className="w-full">
          <div className="flex flex-wrap gap-3">
            {task.taskTags.length !== 0 ? (
              task.taskTags.map((tag) => (
                <TaskTag
                  type={tag.type}
                  taskId={task.id}
                  key={`${task.id}-${tag.type}`}
                />
              ))
            ) : (
              <p className="cursor-default text-left font-light opacity-50">
                Empty
              </p>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent align="start">
          Place content for the popover here.
        </PopoverContent>
      </Popover>
    </FieldFormat>
  );
};
