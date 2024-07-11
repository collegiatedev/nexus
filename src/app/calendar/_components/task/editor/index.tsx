"use client";

import React, { useCallback } from "react";
import { Editable, RenderElementProps, RenderLeafProps } from "slate-react";
import { useEditor } from "~/app/calendar/_components/task/editor/provider";
import { EditorCommands } from "./commands";
import { Leaf, useRenderElement } from "./elements";
import { EditorToolbar } from "./toolbar";

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
      <EditorToolbar />
      <Editable
        className="w-full text-3xl"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) return;

          switch (event.key) {
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
