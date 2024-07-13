import { useSelected, useSlate, type RenderElementProps } from "slate-react";
import { Descendant } from "slate";
import { Editor as SlateEditor } from "slate";

type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
};
type HeadingElement = {
  type: "heading";
  level: number;
  children: CustomText[];
};
type BulletedListElement = {
  type: "bulleted-list";
  align?: string;
  children: Descendant[];
};
export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | BulletedListElement;

type FormattedText = {
  text: string;
  bold?: true;
  italic?: true;
  underline?: true;
};
export type CustomText = FormattedText;

export const chooseElement = (props: RenderElementProps) => {
  switch (props.element.type) {
    case "heading":
      return <HeadingElement {...props} />;
    case "bulleted-list":
      return <BulletedListElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};

// the placeholder text for the empty elements
import "./placeholders.css";
const setPlaceholder = (props: RenderElementProps) => {
  const selected = useSelected();
  const editor = useSlate();
  const isEmpty = SlateEditor.isEmpty(editor, props.element);
  const active = isEmpty && selected;

  let cssClass = "selected-empty-element";
  if (props.element.type === "heading") {
    switch (props.element.level) {
      case 1:
        cssClass = "selected-empty-element-heading-h1";
        break;
      case 2:
        cssClass = "selected-empty-element-heading-h2";
        break;
      case 3:
        cssClass = "selected-empty-element-heading-h3";
        break;
    }
  }

  return (active && cssClass) as string;
};

const DefaultElement = (props: RenderElementProps) => {
  return (
    <p {...props.attributes} className={`${setPlaceholder(props)}`}>
      {props.children}
    </p>
  );
};

const HeadingElement = (props: RenderElementProps) => {
  const level = (props.element as HeadingElement).level;

  switch (level) {
    case 1:
      return (
        <h1
          {...props.attributes}
          className={`text-8xl ${setPlaceholder(props)}`}
        >
          {props.children}
        </h1>
      );
    case 2:
      return (
        <h2
          {...props.attributes}
          className={`text-7xl ${setPlaceholder(props)}`}
        >
          {props.children}
        </h2>
      );
    case 3:
      return (
        <h3
          {...props.attributes}
          className={`text-6xl ${setPlaceholder(props)}`}
        >
          {props.children}
        </h3>
      );
    default:
      return <DefaultElement {...props} />;
  }
};

const BulletedListElement = (props: RenderElementProps) => {
  return <ul {...props.attributes}>{props.children}</ul>;
};
