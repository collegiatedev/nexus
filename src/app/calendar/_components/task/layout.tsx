import { Descendant } from "slate";
import { SlateProvider } from "~/app/calendar/_components/task/editor/provider";

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
    {
      type: "check-list-item",
      checked: true,
      children: [{ text: "Slide to the right." }],
    },
    {
      type: "check-list-item",
      checked: false,
      children: [{ text: "Criss-cross." }],
    },
  ];

  return <SlateProvider initialValue={initialValue}>{children}</SlateProvider>;
};
