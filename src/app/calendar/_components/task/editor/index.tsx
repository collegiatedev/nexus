"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  useSlate,
  useSlateStatic,
} from "slate-react";
import { Range } from "slate";
import { EditorCommands } from "./commands";
import { Leaf, useRenderElement } from "./elements";
import { EditorToolbar } from "./toolbar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export const TextEditor = () => {
  const editor = useSlate();
  const staticEditor = useSlateStatic();
  const [isPopoverVisible, setPopoverVisible] = useState(true);

  const renderElement = useCallback(
    (props: RenderElementProps) => useRenderElement(props),
    [],
  );
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  useEffect(() => {
    const { selection } = staticEditor;
    const isSelectionActive = selection && !Range.isCollapsed(selection);
    setPopoverVisible(isSelectionActive as boolean);
  }, [staticEditor, staticEditor.selection]);

  return (
    <TooltipProvider>
      <Tooltip open={isPopoverVisible}>
        <TooltipTrigger />
        <TooltipContent>
          <EditorToolbar />
        </TooltipContent>
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
      </Tooltip>
    </TooltipProvider>
  );
};
