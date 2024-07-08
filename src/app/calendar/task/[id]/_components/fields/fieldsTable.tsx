import { TableBody, TableCell, TableRow, Table } from "~/components/ui/table";
import { MyTasks } from "~/server/queries";
import { DueDateField } from "./dueDateField";

export type TaskFields = {
  task: MyTasks[number]; // singular task from MyTasks array
};
export const FieldsTable = ({ task }: TaskFields) => {
  return (
    <Table className="my-10 mb-16 border-b border-t">
      <TableBody className="text-xl">
        <DueDateField task={task} />
        {/* <TableRow key={`assigned ${task.id}`}>
            <TableCell>Assigned</TableCell>
            <TableCell>
              <p>Username with icon</p>
            </TableCell>
          </TableRow> */}
        {/* <TableRow key={`tags ${task.id}`}>
            <TableCell>Tags</TableCell>
            <Popover>
              <PopoverTrigger className="w-full">
                <TableCell className="flex flex-wrap gap-2 hover:bg-muted/50">
                  {task.taskTags.length !== 0 ? (
                    task.taskTags.map((tag) => (
                      <TaskTag
                        type={tag.type}
                        taskId={task.id}
                        key={`${task.id}-${tag.type}`}
                      />
                    ))
                  ) : (
                    <p className="cursor-default font-light opacity-50">Empty</p>
                  )}
                </TableCell>
              </PopoverTrigger>
              <PopoverContent align="start">
                Place content for the popover here.
              </PopoverContent>
            </Popover>
          </TableRow> */}
        {/* <TableRow key={`is done ${task.id}`}>
            <TableCell>Done</TableCell>
            <TableCell>
              <Checkbox />
            </TableCell>
          </TableRow> */}
      </TableBody>
    </Table>
  );
};

// utility component for Field Table Rows
export const FieldFormat = ({
  label,
  taskId,
  hovers,
  children,
}: {
  label: string;
  taskId: number;
  hovers?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <TableRow key={`${label}-${taskId}`}>
      <TableCell className="w-1/6">{label}</TableCell>
      <TableCell className={`w-5/6 ${hovers && "hover:bg-muted/50"}`}>
        {children}
      </TableCell>
    </TableRow>
  );
};
