"use client";

import React, { useRef, useState } from "react";
import { Editable, useSlate } from "slate-react";
import { EditorToolbar } from "./toolbar";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useOnDOMBeforeInput } from "./shortcuts";
import { useKeyDown, useRenderLeaf } from "./leaf";
import { useRenderElement } from "./elements";

export const MyEditor = () => {
  const editor = useSlate();
  const [isPopoverVisible, setPopoverVisible] = useState(false);

  const editableRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="w-full">
      <TooltipProvider>
        <Tooltip open={isPopoverVisible}>
          <EditorToolbar
            positionRef={editableRef}
            setShowToolbar={setPopoverVisible}
          />
          <div ref={editableRef}>
            <TooltipTrigger className="w-full">
              <Editable
                placeholder="Writing something, or type '/' for commands"
                className="w-full cursor-text text-left text-3xl outline-none"
                renderElement={useRenderElement()}
                renderLeaf={useRenderLeaf()}
                onKeyDown={(event) => useKeyDown(event, editor)}
                onDOMBeforeInput={(_event) => useOnDOMBeforeInput(editor)}
              />
            </TooltipTrigger>
          </div>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
