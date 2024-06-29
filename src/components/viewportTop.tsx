"use client";

import { useState } from "react";
import { InView } from "react-intersection-observer";

// detects if the element enters and exits the top of the viewport

export const ViewportTop = ({
  onExit,
  onReEnter,
}: {
  onExit: () => void;
  onReEnter: () => void;
}) => {
  const [hasExited, setHasExited] = useState(false);

  return (
    <InView
      root={null} // Use the viewport as the root
      rootMargin="0px" // Margin around the root
      threshold={0} // Trigger when the element is fully out of view
      onChange={(inView, entry) => {
        if (entry.boundingClientRect.top < 0 && !inView && !hasExited) {
          onExit();
          setHasExited(true);
        } else if (entry.boundingClientRect.top >= 0 && inView && hasExited) {
          onReEnter();
          setHasExited(false);
        }
      }}
    >
      {({ ref }) => <div ref={ref} />}
    </InView>
  );
};
