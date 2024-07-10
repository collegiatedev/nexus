"use client";

import { FieldFormat, TaskFields } from "./fieldsTable";
import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { addDays, format } from "date-fns";
import { Calendar } from "~/components/ui/calendar";
import { syncTaskDueDate } from "~/app/actions";

export const DueDateField = ({ task }: TaskFields) => {
  return (
    <FieldFormat label="Due Date" taskId={task.id}>
      <FieldDatePicker
        initialDate={task.dueDate ? task.dueDate : undefined}
        taskId={task.id}
      />
    </FieldFormat>
  );
};

// extended from ~/components/ui/dueDatePicker
const FieldDatePicker = ({
  initialDate,
  taskId,
}: {
  initialDate?: Date;
  taskId: number;
}) => {
  const [dueDate, setDueDate] = React.useState<Date | undefined>(initialDate);

  useEffect(() => {
    const updateDueDate = async () => {
      if (dueDate) await syncTaskDueDate(taskId, dueDate);
    };
    updateDueDate();
  }, [dueDate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex h-full w-full items-center justify-start text-left font-normal",
            !dueDate && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-auto flex-col space-y-2 p-2"
        align="start"
      >
        <Select
          onValueChange={(value) =>
            setDueDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={dueDate} onSelect={setDueDate} />
        </div>
      </PopoverContent>
    </Popover>
  );
};
