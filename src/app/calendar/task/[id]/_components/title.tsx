"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { syncTaskTitle } from "~/app/actions";

export const TaskTitle = ({
  title,
  taskId,
}: {
  title: string;
  taskId: number;
}) => {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [debouncedTitle] = useDebounce(currentTitle, 300);

  useEffect(() => {
    syncTaskTitle(taskId, debouncedTitle);
  }, [debouncedTitle, taskId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value);
  };

  return (
    <input
      type="text"
      className="flex w-full bg-background px-3 py-2 text-6xl outline-none placeholder:text-muted-foreground"
      value={currentTitle}
      onChange={handleChange}
      placeholder="Untitled"
    />
  );
};
