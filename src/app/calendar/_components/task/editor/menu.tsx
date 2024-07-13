import { useEffect, useState } from "react";
import { useSlate, useFocused, ReactEditor } from "slate-react";
import { Range, Editor } from "slate";
import { PopoverContent } from "~/components/ui/popover";

export const EditorCommandMenu = ({
  positionRef,
  showCommandMenu,
  setShowCommandMenu,
}: {
  positionRef: React.RefObject<HTMLDivElement>;
  showCommandMenu: boolean;
  setShowCommandMenu: (show: boolean) => void;
}) => {
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const editor = useSlate();

  const updateMenuPosition = () => {
    const { selection } = editor;
    if (selection && Range.isCollapsed(selection) && positionRef.current) {
      const domPoint = ReactEditor.toDOMPoint(editor, selection.anchor);
      const range = document.createRange();
      range.setStart(domPoint[0], domPoint[1]);
      range.setEnd(domPoint[0], domPoint[1]);

      const rect = range.getBoundingClientRect();
      const editableRect = positionRef.current.getBoundingClientRect();

      const editorHeight = editableRect.height; // editor height
      const lineHeight = rect.height; // line height

      // Offsets
      const PADDING = 3;
      const top =
        rect.top - editableRect.top - editorHeight + lineHeight + PADDING;

      const left = rect.left - editableRect.left;
      setMenuPosition({ top, left });
    }
  };

  useEffect(() => {
    if (showCommandMenu) updateMenuPosition();
  }, [showCommandMenu]);
  return (
    <PopoverContent
      align="start"
      side="bottom"
      sideOffset={menuPosition.top}
      alignOffset={menuPosition.left}
      onOpenAutoFocus={(e) => e.preventDefault()}
      onInteractOutside={() => setShowCommandMenu(false)}
    >
      Place content for the popover here.
    </PopoverContent>
  );
};
