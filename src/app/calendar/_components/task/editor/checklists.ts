import {
  Editor as SlateEditor,
  Element as SlateElement,
  Range,
  Point,
  Transforms,
} from "slate";
import { CustomEditor } from "./commands";

export const withChecklists = (editor: CustomEditor) => {
  const { deleteBackward } = editor;

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [match] = SlateEditor.nodes(editor, {
        match: (n) =>
          !SlateEditor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === "check-list-item",
      });

      if (match) {
        const [, path] = match;
        const start = SlateEditor.start(editor, path);

        if (Point.equals(selection.anchor, start)) {
          const newProperties: Partial<SlateElement> = {
            type: "paragraph",
          };
          Transforms.setNodes(editor, newProperties, {
            match: (n) =>
              !SlateEditor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === "check-list-item",
          });
          return;
        }
      }
    }

    deleteBackward(...args);
  };

  return editor;
};
