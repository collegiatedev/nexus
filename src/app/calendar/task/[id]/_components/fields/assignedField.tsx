import { UserButton } from "@clerk/nextjs";
import { TaskFields, FieldFormat } from "./fieldsTable";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export const AssignedField = ({ task }: TaskFields) => {
  return (
    <FieldFormat label="Assigned" taskId={task.id} hovers={true}>
      {/* <UserButton showName={true} /> */}
      <AssignedUser />
    </FieldFormat>
  );
};

const AssignedUser = () => {
  return (
    <div className="flex cursor-pointer items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      john@doe.com
    </div>
  );
};
