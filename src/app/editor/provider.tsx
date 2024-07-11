"use client";
import { useContext, ReactNode, useState, createContext } from "react";
import { Descendant, createEditor } from "slate";
import { withReact, Slate } from "slate-react";
import { CustomEditor } from "~/types";

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

// Used in layout.tsx
export const EditorProvider = ({
  children,
  initialValue,
}: {
  children: ReactNode;
  initialValue: Descendant[];
}) => {
  const [editor] = useState(() => withReact(createEditor()));

  return (
    <EditorContext.Provider value={{ editor }}>
      <Slate editor={editor} initialValue={initialValue}>
        {children}
      </Slate>
    </EditorContext.Provider>
  );
};
