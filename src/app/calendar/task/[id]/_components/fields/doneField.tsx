"use client";
import { Checkbox } from "~/components/ui/checkbox";
import { type TaskFields, FieldFormat } from "./fieldsTable";
import { useState, useEffect } from "react";
import { syncTaskIsDone } from "~/app/actions";

export const DoneField = ({ task }: TaskFields) => {
  const [isChecked, setIsChecked] = useState(task.done);

  useEffect(() => {
    const updateDueDate = async () => {
      if (isChecked) await syncTaskIsDone(task.id, isChecked);
    };
    updateDueDate();
  }, [isChecked]);

  return (
    <FieldFormat label="Done" taskId={task.id} hovering={false}>
      <Checkbox
        checked={isChecked}
        onCheckedChange={(c: boolean) => setIsChecked(c)}
      />
    </FieldFormat>
  );
};
