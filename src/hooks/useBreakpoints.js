"use client";
import useMediaQuery from "./useMediaQuery";
import React, { useEffect, useState } from "react";

export const useBreakpoints = () => {
  // Call hooks for all media queries, even before checking client-side
  let isXs = useMediaQuery('(max-width: 640px)');
  const isSm = useMediaQuery('(min-width: 641px) and (max-width: 768px)');
  const isMd = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isLg = useMediaQuery('(min-width: 1025px)');

  // State to track client-side rendering
  const [isClient, setIsClient] = useState(false);

  // useEffect to ensure we're client-side before setting active breakpoint
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Default values for server-side rendering (Next.js)
  let active = 'xs';

  // Only determine the active breakpoint if we're on the client
  if (isClient) {
    if (isLg) active = 'lg';
    else if (isMd) active = 'md';
    else if (isSm) active = 'sm';
    else if (isXs) active = 'xs';
  } else {
    isXs = true;
  }

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    active,
  };
}
