import { Editor, Transforms, Element, BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export const EditorCommands = {
  isBoldMarkActive(editor: CustomEditor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  // isCodeBlockActive(editor: CustomEditor) {
  //   const [match] = Editor.nodes(editor, {
  //     match: (n) => Element.isElement(n) && n.type === "code",
  //   });

  //   return !!match;
  // },

  toggleBoldMark(editor: CustomEditor) {
    const isActive = EditorCommands.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },

  // toggleCodeBlock(editor: CustomEditor) {
  //   const isActive = EditorCommands.isCodeBlockActive(editor);
  //   Transforms.setNodes(
  //     editor,
  //     { type: isActive ? undefined : "code" },
  //     { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) },
  //   );
  // },
};
