"use client";

import React, { useRef, useState } from "react";
import { Editable, useSlate } from "slate-react";
import { EditorToolbar } from "./toolbar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
} from "~/components/ui/tooltip";
import { PopoverAnchor, Popover } from "~/components/ui/popover";
import { useOnDOMBeforeInput } from "./shortcuts";
import { useKeyDown, useRenderLeaf } from "./leaf";
import { useRenderElement } from "./render";
import { EditorCommandMenu } from "./menu";

export const MyEditor = () => {
  const editor = useSlate();
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const editableRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="w-full">
      <TooltipProvider>
        <Popover open={isPopoverVisible}>
          <Tooltip open={isToolbarVisible}>
            <EditorToolbar
              positionRef={editableRef}
              setShowToolbar={setIsToolbarVisible}
            />
            <EditorCommandMenu
              positionRef={editableRef}
              showCommandMenu={isPopoverVisible}
              setShowCommandMenu={setIsPopoverVisible}
            />
            <div ref={editableRef}>
              <TooltipTrigger className="w-full">
                <PopoverAnchor className="w-full">
                  <Editable
                    className="w-full cursor-text text-left text-3xl outline-none"
                    renderElement={useRenderElement()}
                    renderLeaf={useRenderLeaf()}
                    onDOMBeforeInput={(_event) => useOnDOMBeforeInput(editor)}
                    onKeyDown={(event) =>
                      useKeyDown({
                        event,
                        editor,
                        setShowCommandMenu: setIsPopoverVisible,
                      })
                    }
                  />
                </PopoverAnchor>
              </TooltipTrigger>
            </div>
          </Tooltip>
        </Popover>
      </TooltipProvider>
    </div>
  );
};
