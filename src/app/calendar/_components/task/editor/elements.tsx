import {
  ReactEditor,
  useReadOnly,
  useSelected,
  useSlate,
  useSlateStatic,
  type RenderElementProps,
} from "slate-react";
import {
  Descendant,
  Element as SlateElement,
  Editor as SlateEditor,
  Transforms,
} from "slate";

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
type ChecklistItemElement = {
  type: "check-list-item";
  checked: boolean;
  children: CustomText[];
};
export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | BulletedListElement
  | ChecklistItemElement;
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
    case "check-list-item":
      return <CheckListItemElement {...props} />;
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

const CheckListItemElement = (props: RenderElementProps) => {
  if (props.element.type !== "check-list-item") return null;

  const { attributes, children, element } = props;
  const editor = useSlateStatic();
  const readOnly = useReadOnly();
  const { checked } = element;

  return (
    <div {...attributes} className="flex flex-row items-center [&+&]:mt-0">
      <span contentEditable={false} className="mr-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => {
            const path = ReactEditor.findPath(editor, element);
            const newProperties: Partial<SlateElement> = {
              checked: event.target.checked,
            };
            Transforms.setNodes(editor, newProperties, { at: path });
          }}
        />
      </span>
      <span
        contentEditable={!readOnly}
        suppressContentEditableWarning
        className={`flex-1 ${
          checked ? "line-through opacity-[0.666]" : "no-underline opacity-100"
        } focus:outline-none ${setPlaceholder(props)} min-w-[1px]`}
      >
        {children}
      </span>
    </div>
  );
};
