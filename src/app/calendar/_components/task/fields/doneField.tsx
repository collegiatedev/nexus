"use client";
import { type TaskFields, FieldFormat } from "./fieldsTable";
import { DoneCheckbox } from "~/components/doneCheckbox";

export const DoneField = ({ task }: TaskFields) => {
  return (
    <FieldFormat label="Done" taskId={task.id} hovering={false}>
      <DoneCheckbox done={task.done} id={task.id} />
    </FieldFormat>
  );
};
