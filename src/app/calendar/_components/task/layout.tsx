import { Descendant } from "slate";
import { EditorProvider } from "~/app/calendar/_components/task/editor/provider";

// layout.tsx component used in both @modal/(.)/task/[id] and task/[id]
export const TaskLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // make this into a server await call first
  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
    {
      type: "paragraph",
      children: [{ text: "A second line of text in a different paragraph." }],
    },
  ];

  return (
    <EditorProvider initialValue={initialValue}>{children}</EditorProvider>
  );
};
