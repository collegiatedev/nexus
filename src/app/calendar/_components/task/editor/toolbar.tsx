"use client";

import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { EditorCommands } from "./commands";
import { useSlate } from "slate-react";

// fuck css, ToggleGroup width = 1, meaning that div ref setups are scuffed
// so just gonna test and hardcode the width here, change if we increase the toolbar.
export const EDITOR_WIDTH = 130; // serious guess-timate
export const EditorToolbar = () => {
  const editor = useSlate();

  return (
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
  );
};
