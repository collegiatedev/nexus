"use client";
import { Checkbox } from "~/components/ui/checkbox";

import { useState, useEffect } from "react";
import { syncTaskIsDone } from "~/app/actions";

export const DoneCheckbox = ({ done, id }: { done: boolean; id: number }) => {
  const [isChecked, setIsChecked] = useState(done);

  useEffect(() => {
    const updateDueDate = async () => await syncTaskIsDone(id, isChecked);
    updateDueDate();
  }, [isChecked]);

  return (
    <Checkbox
      checked={isChecked}
      onCheckedChange={(c: boolean) => setIsChecked(c)}
    />
  );
};
