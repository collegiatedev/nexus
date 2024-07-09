import { TaskTagTypes } from "@prisma/client";
import { X } from "lucide-react";

export const TaskTag = ({
  type,
  showDelete = true,
  onDelete,
}: {
  type: TaskTagTypes;
  // not a great pattern, but good enough
  showDelete?: boolean;
  onDelete?: (type: TaskTagTypes) => void;
}) => {
  const tagColor = getTagColor(type);

  return (
    <div
      className={`rounded-md ${tagColor} flex w-fit cursor-pointer px-2 py-1 text-lg`}
    >
      {type}
      {showDelete && (
        <button
          className="ml-1 flex h-full items-center justify-center"
          onClick={onDelete && (() => onDelete(type))}
        >
          <X className="h-4 w-4" />
        </button>
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
