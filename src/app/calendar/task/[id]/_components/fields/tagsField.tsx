"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { type TaskFields, FieldFormat } from "./fieldsTable";
import { TaskTag } from "~/components/taskTag";
import { ReactNode } from "react";
import React from "react";

export const TagsField = ({ task }: TaskFields) => {
  return (
    <FieldFormat label="Tags" taskId={task.id}>
      <TagFieldPicker>
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
      </TagFieldPicker>
    </FieldFormat>
  );
};

const TagFieldPicker = ({ children }: { children: ReactNode }) => {
  return (
    <Popover>
      {/* need asChild whenever child div contains button */}
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="start">
        Place content for the popover here.
      </PopoverContent>
    </Popover>
  );
};
