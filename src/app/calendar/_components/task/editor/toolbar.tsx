"use client";

import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { EditorCommands } from "./commands";
import { useEffect, useRef } from "react";
import { useFocused, useSlate } from "slate-react";
import { Editor, Range } from "slate";

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
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

// export const HoveringToolbar = () => {
//   const inFocus = useFocused();
//   const { editor } = useEditor();

//   useEffect(() => {
//     // Get the current reference to the toolbar element
//     // Get the current selection from the editor
//     const { selection } = editor;

//     // If there is no selection, the editor is not in focus, the selection is collapsed, or the selected text is empty, hide the toolbar
//     if (
//       !selection ||
//       !inFocus ||
//       Range.isCollapsed(selection) ||
//       Editor.string(editor, selection) === ""
//     ) {
//       return;
//     }
//   });

//   return (
//     <div>
//       <ToggleGroup type="multiple">
//         <ToggleGroupItem
//           value="bold"
//           aria-label="Toggle bold"
//           onClick={() => EditorCommands.toggleBoldMark(editor)}
//         >
//           <Bold className="h-4 w-4" />
//         </ToggleGroupItem>
//         <ToggleGroupItem value="italic" aria-label="Toggle italic">
//           <Italic className="h-4 w-4" />
//         </ToggleGroupItem>
//         <ToggleGroupItem value="underline" aria-label="Toggle underline">
//           <Underline className="h-4 w-4" />
//         </ToggleGroupItem>
//       </ToggleGroup>
//     </div>
//   );
// };
