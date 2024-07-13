import { RenderElementProps } from "slate-react";
import { useCallback, useState } from "react";
import { chooseElement } from "./elements";
import { PlusIcon } from "lucide-react";

export const useRenderElement = () => {
  return useCallback(
    (props: RenderElementProps) => <RenderedElement {...props} />,
    [],
  );
};

const RenderedElement = (props: RenderElementProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const showButton = isHovering
    ? "opacity-80 pointer-events-auto"
    : "opacity-0 pointer-events-none";

  return (
    <div
      className="flex items-center"
      onPointerEnter={() => setIsHovering(true)}
      onPointerOut={() => setIsHovering(false)}
    >
      <div
        className={`${showButton} mr-2 cursor-pointer`}
        contentEditable={false}
      >
        <PlusIcon />
      </div>
      {/* min-w-[1px] ensures that blinking typing cursor is always present */}
      <div className="min-w-[1px]">{chooseElement(props)}</div>
    </div>
  );
};
