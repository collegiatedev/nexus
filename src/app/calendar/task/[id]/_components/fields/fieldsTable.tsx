import { TableBody, TableCell, TableRow, Table } from "~/components/ui/table";
import { MyTasks } from "~/server/queries";
import { DueDateField } from "./dueDateField";
import { AssignedField } from "./assignedField";
import { DoneField } from "./doneField";
import { TagsField } from "./tagsField";

export type TaskFields = {
  task: MyTasks[number]; // singular task from MyTasks array
};
export const FieldsTable = ({ task }: TaskFields) => {
  return (
    <Table className="my-10 mb-16 border-b border-t">
      <TableBody className="text-xl">
        <DueDateField task={task} />

        {/* todo, with clerk org */}
        <AssignedField task={task} />
        <TagsField task={task} />
        <DoneField task={task} />
      </TableBody>
    </Table>
  );
};

// utility component for Field Table Rows
export const FieldFormat = ({
  label,
  taskId,
  children,
  hovering = true,
}: {
  label: string;
  taskId: number;
  children: React.ReactNode;
  hovering?: boolean;
}) => {
  return (
    <TableRow key={`${label}-${taskId}`}>
      <TableCell className="w-1/6">{label}</TableCell>
      {/* desynced with tagsField.tsx css */}
      <TableCell className={`w-5/6 ${hovering && "hover:bg-muted/50"}`}>
        {children}
      </TableCell>
    </TableRow>
  );
};
