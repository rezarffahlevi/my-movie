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
      const [entry] = entries;

      if (entry.isIntersecting && hasMore) {
        load();
      }
    },
    [load, hasMore]
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "200px",
      threshold: 0.1,
    });

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [handleIntersect]);

  return (
    <div>
      {children}

      {/* Loader is always visible while loading */}
      {hasMore && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>{loader}</div>
      )}

      {/* Hidden sentinel element for IntersectionObserver */}
      <div ref={sentinelRef} style={{ height: "1px", visibility: "hidden" }} />

      {/* End message */}
      {!hasMore && endMessage}
    </div>
  );
});
