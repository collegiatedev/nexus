"use client";

import React, { useCallback, useRef, useState } from "react";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  useSlate,
} from "slate-react";
import { Leaf, useKeyDown, useRenderElement } from "./elements";
import { EditorToolbar } from "./toolbar";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export const MyEditor = () => {
  const editor = useSlate();
  const [isPopoverVisible, setPopoverVisible] = useState(false);

  const editableRef = useRef<HTMLDivElement | null>(null);

  const renderElement = useCallback(
    (props: RenderElementProps) => useRenderElement(props),
    [],
  );
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

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
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={(event) => useKeyDown(event, editor)}
                style={{ border: "none" }}
              />
            </TooltipTrigger>
          </div>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
