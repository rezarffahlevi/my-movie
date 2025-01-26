import React, { useCallback, useEffect, useRef } from "react";

interface InfiniteScrollProps {
  load: () => void;
  hasMore: boolean;
  loader: React.ReactNode;
  children?: React.ReactNode;
  endMessage?: React.ReactNode;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = React.memo(({
  load,
  hasMore,
  loader,
  children,
  endMessage,
}) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries; // Get the first entry
      // console.log("Intersecting:", entry.isIntersecting, "Has More:", hasMore);

      if (entry.isIntersecting && hasMore) {
        // console.log("Loading more...");
        load();
      }
    },
    [load, hasMore] // Ensure the latest `hasMore` is used
  );

  useEffect(() => {
    // console.log("Setting up observer...");

    // Initialize IntersectionObserver
    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "200px", // Trigger early for smoother loading
      threshold: 0.1, // Trigger when 10% of the sentinel is visible
    });

    if (sentinelRef.current) {
      // console.log("Observing sentinel:", sentinelRef.current);
      observerRef.current.observe(sentinelRef.current);
    }

    // Cleanup on unmount
    return () => {
      // console.log("Cleaning up observer...");
      observerRef.current?.disconnect();
    };
  }, [handleIntersect]); // Ensure `handleIntersect` is up to date

  return (
    <div>
      {children}
      <div ref={sentinelRef} style={{ height: "1px", visibility: "hidden" }}>
        {hasMore && loader}
      </div>
      {!hasMore && endMessage}
    </div>
  );
});
