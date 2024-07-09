"use client";

import { addMinutes } from "date-fns";
import { TaskFields, FieldFormat } from "./fieldsTable";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useUser } from "@clerk/nextjs";

export const AssignedField = ({ task }: TaskFields) => {
  return (
    <FieldFormat label="Assigned" taskId={task.id} hovers={true}>
      <AssignedUser />
    </FieldFormat>
  );
};

const AssignedUser = () => {
  // get user using api call
  const { user } = useUser();

  const memberships = user?.organizationMemberships;
  //   memberships?.name

  return (
    <div className="flex cursor-pointer items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user?.imageUrl} />
        <AvatarFallback>C</AvatarFallback>
      </Avatar>
      <p className="font-medium">{user?.fullName} -</p>
      {memberships?.map((m) => m.organization.name)}
    </div>
  );
};
