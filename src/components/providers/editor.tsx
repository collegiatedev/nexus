"use client";
import { useContext, ReactNode, useState, createContext, useMemo } from "react";
import { Descendant, createEditor } from "slate";
import { withHistory } from "slate-history";
import { withReact, Slate } from "slate-react";
import { CustomEditor } from "~/app/calendar/_components/task/editor/commands";

// Context, used in layout.tsx

interface EditorContextType {
  editor: CustomEditor;
}
const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context)
    throw new Error("useEditor must be used within an EditorProvider");
  return context;
};

export const EditorProvider = ({
  children,
  initialValue,
}: {
  children: ReactNode;
  initialValue: Descendant[];
}) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <EditorContext.Provider value={{ editor }}>
      <Slate editor={editor} initialValue={initialValue}>
        {children}
      </Slate>
    </EditorContext.Provider>
  );
};
