"use client";
import { useContext, ReactNode, useState, createContext, useMemo } from "react";
import { Descendant, createEditor } from "slate";
import { withReact, Slate } from "slate-react";
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor, withHistory } from "slate-history";

// type definitions
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
};

export type HeadingElement = {
  type: "heading";
  level: number;
  children: CustomText[];
};

export type CodeElement = {
  type: "code";
  children: CustomText[];
};

export type CustomElement = ParagraphElement | HeadingElement | CodeElement;
export type FormattedText = { text: string; bold?: true };
export type CustomText = FormattedText;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

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
