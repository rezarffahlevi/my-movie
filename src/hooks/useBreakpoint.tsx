import { useState, useEffect } from "react";

// Define the screen widths for breakpoints
const BREAKPOINTS = {
  xs: 0, // extra small (mobile)
  sm: 640, // small (mobile/tablet)
  md: 768, // medium (tablet)
  lg: 1024, // large (desktop)
  xl: 1280, // extra large (desktop)
};

// Custom hook to track the screen width and return boolean for each breakpoint
export const useBreakpoint = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const updateWindowWidth = () => setWindowWidth(window.innerWidth);

    // Add event listener to track window resizing
    window.addEventListener("resize", updateWindowWidth);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  // Helper functions to check the current breakpoint
  const isXs = windowWidth <= BREAKPOINTS.sm;
  const isSm = windowWidth > BREAKPOINTS.sm && windowWidth <= BREAKPOINTS.md;
  const isMd = windowWidth > BREAKPOINTS.md && windowWidth <= BREAKPOINTS.lg;
  const isLg = windowWidth > BREAKPOINTS.lg && windowWidth <= BREAKPOINTS.xl;
  const isXl = windowWidth > BREAKPOINTS.xl;

  return {
    windowWidth,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
  };
};
