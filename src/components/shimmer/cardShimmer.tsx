import React, { FC } from "react";

type Props = {
    count?: number;
}
export const CardShimmer: FC<Props> = React.memo((props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4 py-0">
      {/* Generate multiple shimmer placeholders */}
      {Array(props.count ?? 12)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="space-y-4" role="presentation">
            {/* Image Placeholder */}
            <div className="relative w-full h-64 bg-gray-300 rounded-md overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full animate-shimmer"></div>
            </div>
            {/* Text Placeholder */}
            <div className="h-4 bg-gray-300 rounded-md"></div>
            <div className="h-4 bg-gray-300 rounded-md w-3/4"></div>
          </div>
        ))}
    </div>
  );
});
