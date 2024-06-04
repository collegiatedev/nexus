"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// when changing routes, this wrapper component will render the children only after the route change is complete
export const RouteChangeComplete = ({
  targetUrl,
  children,
}: {
  targetUrl: string;
  children: React.ReactNode;
}) => {
  const [routeChangeComplete, setRouteChangeComplete] =
    useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    // Mark the route change as not complete initially
    setRouteChangeComplete(false);

    // Simulate the completion of a route change
    const handleRouteChangeComplete = () => {
      setRouteChangeComplete(targetUrl === pathname);
    };

    // Assuming a short delay for the route change to complete
    const timer = setTimeout(handleRouteChangeComplete, 100); // Adjust the delay as needed

    // Cleanup timer on unmount or dependency change
    return () => clearTimeout(timer);
  }, [pathname]);

  return <div>{routeChangeComplete ? children : null}</div>;
};
