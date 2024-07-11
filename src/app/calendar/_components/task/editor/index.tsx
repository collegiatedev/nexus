"use client";

import React, { useCallback } from "react";
import { Editable, RenderElementProps, RenderLeafProps } from "slate-react";
import { useEditor } from "~/components/providers/editor";
import { EditorCommands } from "./commands";
import { Leaf, useRenderElement } from "./elements";

export const TextEditor = () => {
  const { editor } = useEditor();

  const renderElement = useCallback(
    (props: RenderElementProps) => useRenderElement(props),
    [],
  );
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <>
      <div>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            EditorCommands.toggleBoldMark(editor);
          }}
        >
          Bold
        </button>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            EditorCommands.toggleCodeBlock(editor);
          }}
        >
          Code
        </button>
      </div>
      <Editable
        className="w-full text-3xl"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) return;

          // Replace the `onKeyDown` logic with our new commands.
          switch (event.key) {
            case "`": {
              event.preventDefault();
              EditorCommands.toggleCodeBlock(editor);
              break;
            }

            case "b": {
              event.preventDefault();
              EditorCommands.toggleBoldMark(editor);
              break;
            }
          }
        }}
      />
    </>
  );
};
