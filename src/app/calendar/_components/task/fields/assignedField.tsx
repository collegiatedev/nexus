"use client";

import { TaskFields, FieldFormat } from "./fieldsTable";
import { AssignedUser } from "~/components/assignedUser";

export const AssignedField = ({ task }: TaskFields) => {
  return (
    <FieldFormat label="Assigned" taskId={task.id}>
      <AssignedUser />
    </FieldFormat>
  );
};
