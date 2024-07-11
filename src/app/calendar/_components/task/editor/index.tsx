"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  useFocused,
  useSlate,
} from "slate-react";
import { Editor, Range } from "slate";
import { EditorCommands } from "./commands";
import { Leaf, useRenderElement } from "./elements";
import { EDITOR_WIDTH, EditorToolbar } from "./toolbar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export const MyEditor = () => {
  const editor = useSlate();
  const inFocus = useFocused();
  const [isPopoverVisible, setPopoverVisible] = useState(false);

  const editableRef = useRef<HTMLDivElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const renderElement = useCallback(
    (props: RenderElementProps) => useRenderElement(props),
    [],
  );
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  useEffect(() => {
    const { selection } = editor;
    const isSelectionActive =
      selection &&
      inFocus &&
      !Range.isCollapsed(selection) &&
      Editor.string(editor, selection) !== "";

    if (isSelectionActive && editableRef.current) {
      const domSelection = window.getSelection();
      if (domSelection && domSelection.rangeCount > 0) {
        const range = domSelection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const editableRect = editableRef.current.getBoundingClientRect();

        const top = -(rect.top - editableRect.top);
        // get center...
        const left =
          rect.width / 2 + rect.left - editableRect.left - EDITOR_WIDTH / 2;
        setTooltipPosition({ top, left });
      }
    }

    setPopoverVisible(isSelectionActive as boolean);
  }, [editor, editor.selection, inFocus]);

  return (
    <div>
      <TooltipProvider>
        <Tooltip open={isPopoverVisible}>
          <TooltipContent
            sideOffset={tooltipPosition.top}
            alignOffset={tooltipPosition.left}
            align="start"
            // this is from tagsField, do the equivalent for this
            // onInteractOutside={(event: any) => {
            //   // If the click was inside the PopoverTrigger, do not close the popover
            //   const trigger = triggerRef.current;
            //   if (trigger && trigger.contains(event.target)) return;
            //   setIsPopoverOpen(false);
            // }}
          >
            <EditorToolbar />
          </TooltipContent>

          <div ref={editableRef}>
            <TooltipTrigger>
              <Editable
                className="w-full text-left text-3xl"
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
                }}
              />
            </TooltipTrigger>
          </div>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
