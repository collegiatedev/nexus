"use client";

import React, { useEffect, useState } from "react";
import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { EditorCommands } from "./commands";
import { useSlate, useFocused } from "slate-react";
import { Editor, Range } from "slate";
import { TooltipContent } from "~/components/ui/tooltip";

// fuck css, ToggleGroup width = 1, meaning that div ref setups are scuffed
// so just gonna test and hardcode the width here, change if we increase the toolbar.
export const EDITOR_WIDTH = 130; // serious guess-timate
export const EditorToolbar = ({
  positionRef,
  setShowToolbar,
}: {
  positionRef: React.RefObject<HTMLDivElement>;
  setShowToolbar: (show: boolean) => void;
}) => {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const editor = useSlate();
  const inFocus = useFocused();

  useEffect(() => {
    const { selection } = editor;
    const isSelectionActive =
      selection &&
      inFocus &&
      !Range.isCollapsed(selection) &&
      Editor.string(editor, selection) !== "";

    if (isSelectionActive && positionRef.current) {
      const domSelection = window.getSelection();
      if (domSelection && domSelection.rangeCount > 0) {
        const range = domSelection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const editableRect = positionRef.current.getBoundingClientRect();
        // offsets
        const top = -(rect.top - editableRect.top);
        // get center using love and black magic
        const left =
          (rect.width - EDITOR_WIDTH) / 2 + rect.left - editableRect.left;
        setTooltipPosition({ top, left });
      }
    }
    setShowToolbar(isSelectionActive as boolean);
  }, [editor, editor.selection, inFocus, positionRef]);

  return (
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
      <ToggleGroup type="multiple">
        <ToggleGroupItem
          value="bold"
          aria-label="Toggle bold"
          onClick={() => EditorCommands.toggleBoldMark(editor)}
        >
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="italic"
          aria-label="Toggle italic"
          onClick={() => EditorCommands.toggleItalicMark(editor)}
        >
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="underline"
          aria-label="Toggle underline"
          onClick={() => EditorCommands.toggleUnderlineMark(editor)}
        >
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </TooltipContent>
  );
};
