import { RenderElementProps, useFocused, useSelected } from "slate-react";
import { useCallback, useState } from "react";
import { PlusIcon } from "lucide-react";
import { chooseElement } from "./elements";

export const useRenderElement = () => {
  return useCallback(
    (props: RenderElementProps) => <RenderedElement {...props} />,
    [],
  );
};

const RenderedElement = (props: RenderElementProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const selected = useSelected();
  const focused = useFocused();

  const hovering =
    isHovering || (selected && focused)
      ? "opacity-80 pointer-events-auto"
      : "opacity-0 pointer-events-none";

  return (
    <div
      className="flex items-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={`mr-2 transition-opacity duration-200 ${hovering} cursor-pointer`}
        contentEditable={false}
      >
        <PlusIcon />
      </div>
      {chooseElement(props)}
    </div>
  );
};
