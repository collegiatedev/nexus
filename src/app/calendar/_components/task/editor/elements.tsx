import type { RenderElementProps, RenderLeafProps } from "slate-react";

// const CodeElement = (props: RenderElementProps) => {
//   return (
//     <pre {...props.attributes}>
//       <code>{props.children}</code>
//     </pre>
//   );
// };

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>;
};

export const useRenderElement = (props: RenderElementProps) => {
  switch (props.element.type) {
    // case "code":
    //   return <CodeElement {...props} />;
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
