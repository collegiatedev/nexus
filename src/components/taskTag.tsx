import { X } from "lucide-react";
import { revalidatePath } from "next/cache";
import { deleteMyTaskTag } from "~/server/queries";
import { TaskTagTypes } from "~/types";

export const TaskTag = ({
  type,
  tagId,
}: {
  type: TaskTagTypes;
  tagId: number;
}) => {
  const tagColor = getTagColor(type);

  return (
    <div className={`rounded-md ${tagColor} flex px-2 py-1 text-lg`}>
      {type}
      <form
        // double check if this works for all implementations
        action={async () => {
          "use server";
          await deleteMyTaskTag(tagId);
          revalidatePath("/tasks/[id]");
        }}
      >
        <button
          type="submit"
          className="ml-1 flex h-full items-center justify-center"
        >
          <X className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

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
