// withShortcuts.ts
import {
  Editor,
  Element as SlateElement,
  Node as SlateNode,
  Point,
  Range,
  Transforms,
} from "slate";
import { CustomElement } from "./elements";
import { CustomEditor } from "./commands";
import { ReactEditor } from "slate-react";

export const SHORTCUTS: { [key: string]: string } = {
  "-": "list-item",
  "#": "heading-one",
  "##": "heading-two",
  "###": "heading-three",
};
export const withShortcuts = (editor: CustomEditor) => {
  const { insertText, deleteBackward } = editor;

  editor.insertText = (text) => {
    const { selection } = editor;

    if (text.endsWith(" ") && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range) + text.slice(0, -1);
      const type = SHORTCUTS[beforeText];

      if (type) {
        Transforms.select(editor, range);

        if (!Range.isCollapsed(range)) {
          Transforms.delete(editor);
        }

        const newProperties: Partial<SlateElement> = {
          type: type === "list-item" ? "list-item" : "heading",
          level: type.startsWith("heading")
            ? beforeText.split("#").length - 1
            : undefined,
        };
        Transforms.setNodes<SlateElement>(editor, newProperties, {
          match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
        });

        // const newProperties: Partial<SlateElement> = {
        //   type: type as SlateElement["type"],
        // }
        Transforms.setNodes<SlateElement>(editor, newProperties, {
          match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
        });

        if (type === "list-item") {
          const list: CustomElement = {
            type: "bulleted-list",
            children: [],
          };
          Transforms.wrapNodes(editor, list, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === "list-item",
          });
        }

        return;
      }
    }

    insertText(text);
  };

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          !Editor.isEditor(block) &&
          SlateElement.isElement(block) &&
          block.type !== "paragraph" &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: Partial<SlateElement> = {
            type: "paragraph",
          };
          Transforms.setNodes(editor, newProperties);

          if (block.type === "bulleted-list") {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === "bulleted-list",
              split: true,
            });
          }

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor;
};

export const useOnDOMBeforeInput = (editor: CustomEditor) => {
  queueMicrotask(() => {
    const pendingDiffs = ReactEditor.androidPendingDiffs(editor);

    const scheduleFlush = pendingDiffs?.some(({ diff, path }) => {
      if (!diff.text.endsWith(" ")) {
        return false;
      }

      const { text } = SlateNode.leaf(editor, path);
      const beforeText = text.slice(0, diff.start) + diff.text.slice(0, -1);
      if (!(beforeText in SHORTCUTS)) {
        return false;
      }

      const blockEntry = Editor.above(editor, {
        at: path,
        match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
      });
      if (!blockEntry) {
        return false;
      }

      const [, blockPath] = blockEntry;
      return Editor.isStart(editor, Editor.start(editor, path), blockPath);
    });

    if (scheduleFlush) {
      ReactEditor.androidScheduleFlush(editor);
    }
  });
};
