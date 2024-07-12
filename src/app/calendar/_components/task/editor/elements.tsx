import type { RenderElementProps } from "slate-react";
import { Descendant } from "slate";
import { useCallback } from "react";

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
export type FormattedText = {
  text: string;
  bold?: true;
  italic?: true;
  underline?: true;
};
export type CustomText = FormattedText;

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const HeadingElement = (props: RenderElementProps) => {
  const level = (props.element as HeadingElement).level;
  switch (level) {
    case 1:
      return (
        <h1 {...props.attributes} className="text-8xl">
          {props.children}
        </h1>
      );
    case 2:
      return (
        <h2 {...props.attributes} className="text-7xl">
          {props.children}
        </h2>
      );
    case 3:
      return (
        <h3 {...props.attributes} className="text-6xl">
          {props.children}
        </h3>
      );
    default:
      return <p {...props.attributes}>{props.children}</p>;
  }
};

const BulletedListElement = (props: RenderElementProps) => {
  return <ul {...props.attributes}>{props.children}</ul>;
};

const RenderElement = (props: RenderElementProps) => {
  switch (props.element.type) {
    case "heading":
      return <HeadingElement {...props} />;
    case "bulleted-list":
      return <BulletedListElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};

export const useRenderElement = () => {
  return useCallback((props: RenderElementProps) => RenderElement(props), []);
};
