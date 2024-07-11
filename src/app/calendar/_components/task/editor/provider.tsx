"use client";
import { ReactNode, useMemo } from "react";
import { Descendant, createEditor } from "slate";
import { withHistory } from "slate-history";
import { withReact, Slate } from "slate-react";

// Provider, used in layout.tsx
// Setup this way cuz we need this to be a client component, layout retrieves as server component
// if you need slate editor after, use the useSlate/useSlateStatic hook
export const SlateProvider = ({
  children,
  initialValue,
}: {
  children: ReactNode;
  initialValue: Descendant[];
}) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} initialValue={initialValue}>
      {children}
    </Slate>
  );
};
