import { type RenderLeafProps } from "slate-react";
import { type CustomEditor, EditorCommands } from "./commands";
import { useCallback } from "react";

const Leaf = (props: RenderLeafProps) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
        textDecoration: props.leaf.underline ? "underline" : "none",
      }}
    >
      {props.children}
    </span>
  );
};

export const useRenderLeaf = () => {
  return useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
};

export const useKeyDown = ({
  event,
  editor,
  setShowCommandMenu,
}: {
  event: React.KeyboardEvent<HTMLDivElement>;
  editor: CustomEditor;
  setShowCommandMenu: (value: boolean) => void;
}) => {
  if (!event.ctrlKey && !event.metaKey) return;
  switch (event.key) {
    case "b": {
      event.preventDefault();
      EditorCommands.toggleBoldMark(editor);
      break;
    }
    case "i": {
      event.preventDefault();
      EditorCommands.toggleItalicMark(editor);
      break;
    }
    case "u": {
      event.preventDefault();
      EditorCommands.toggleUnderlineMark(editor);
      break;
    }
  }
};
