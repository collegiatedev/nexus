import { TaskTagTypes } from "@prisma/client";
import { X } from "lucide-react";
import { deleteTaskTag } from "~/app/actions";

export const TaskTag = ({
  type,
  taskId,
  showDelete = false,
}: {
  type: TaskTagTypes;
  taskId: number;
  showDelete?: boolean;
}) => {
  const tagColor = getTagColor(type);

  return (
    <div
      className={`rounded-md ${tagColor} flex w-fit cursor-pointer px-2 py-1 text-lg`}
    >
      {type}
      {showDelete && (
        <form action={async () => await deleteTaskTag(taskId, type)}>
          <button
            type="submit"
            className="ml-1 flex h-full items-center justify-center"
          >
            <X className="h-5 w-5" />
          </button>
        </form>
      )}
    </div>
  );
};

// change to enum later
const getTagColor = (type: TaskTagTypes) => {
  switch (type) {
    case TaskTagTypes.Deadline:
      return "bg-red-500";
    case TaskTagTypes.Logistics:
      return "bg-blue-500";
    case TaskTagTypes.Meeting:
      return "bg-green-500";
    case TaskTagTypes.Exam:
      return "bg-yellow-500";
    case TaskTagTypes.School:
      return "bg-purple-500";
    case TaskTagTypes.Activity:
      return "bg-pink-500";
    case TaskTagTypes.Project:
      return "bg-teal-500";
    case TaskTagTypes.Essays:
      return "bg-orange-500";
    default:
      return "bg-gray-900";
  }
};
