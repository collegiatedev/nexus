import { Editor, Transforms, Element, BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";
import { CustomElement } from "./elements";

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export const EditorCommands = {
  // bold, italic, underline
  isBoldMarkActive(editor: CustomEditor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },
  isItalicMarkActive(editor: CustomEditor) {
    const marks = Editor.marks(editor);
    return marks ? marks.italic === true : false;
  },
  isUnderlineMarkActive(editor: CustomEditor) {
    const marks = Editor.marks(editor);
    return marks ? marks.underline === true : false;
  },

  toggleBoldMark(editor: CustomEditor) {
    const isActive = EditorCommands.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },
  toggleItalicMark(editor: CustomEditor) {
    const isActive = EditorCommands.isItalicMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "italic");
    } else {
      Editor.addMark(editor, "italic", true);
    }
  },
  toggleUnderlineMark(editor: CustomEditor) {
    const isActive = EditorCommands.isUnderlineMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "underline");
    } else {
      Editor.addMark(editor, "underline", true);
    }
  },

  // heading
  isHeadingActive(editor: CustomEditor, level: number) {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        Element.isElement(n) && n.type === "heading" && n.level === level,
    });

    return !!match;
  },
  toggleHeading(editor: CustomEditor, level: number) {
    const isActive = EditorCommands.isHeadingActive(editor, level);
    Transforms.setNodes<CustomElement>(
      editor,
      {
        type: isActive ? "paragraph" : "heading",
        level: isActive ? undefined : level,
      },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) },
    );
  },
};
