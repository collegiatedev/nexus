import type { RenderElementProps, RenderLeafProps } from "slate-react";
import { CustomEditor, EditorCommands } from "./commands";

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>;
};
const HeadingElement = (props: RenderElementProps) => {
  const level = (props.element as HeadingElement).level;
  switch (level) {
    case 1:
      return <h1 {...props.attributes}>{props.children}</h1>;
    case 2:
      return <h2 {...props.attributes}>{props.children}</h2>;
    case 3:
      return <h3 {...props.attributes}>{props.children}</h3>;
  }
};
export const useRenderElement = (props: RenderElementProps) => {
  switch (props.element.type) {
    case "heading":
      return <HeadingElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};

export const Leaf = (props: RenderLeafProps) => {
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

export const useKeyDown = (
  event: React.KeyboardEvent<HTMLDivElement>,
  editor: CustomEditor,
) => {
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

type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
};
type HeadingElement = {
  type: "heading";
  level: number;
  children: CustomText[];
};
export type CustomElement = ParagraphElement | HeadingElement;
export type FormattedText = {
  text: string;
  bold?: true;
  italic?: true;
  underline?: true;
};
export type CustomText = FormattedText;
