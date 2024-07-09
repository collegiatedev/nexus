"use client";

import { TaskFields, FieldFormat } from "./fieldsTable";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "~/components/ui/skeleton";
import { useState, useEffect } from "react";

export const AssignedField = ({ task }: TaskFields) => {
  return (
    <FieldFormat label="Assigned" taskId={task.id}>
      <AssignedUser />
    </FieldFormat>
  );
};

const AssignedUser = () => {
  // get user using api call
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  const memberships = user?.organizationMemberships;

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    );
  }

  return (
    <div className="flex cursor-pointer items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user?.imageUrl} />
      </Avatar>
      <p className=" pl-2 font-medium">{user?.fullName} -</p>
      {memberships?.map((m) => m.organization.name)}
    </div>
  );
};
