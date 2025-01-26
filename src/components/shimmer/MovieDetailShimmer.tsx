import React from "react";
import { CardShimmer } from "./CCardShimmer";

export const MovieDetailShimmer: React.FC = React.memo(() => {
  return (
    <div className="animate-pulse p-6 space-y-6">
      {/* Movie Poster */}
      <div className="bg-gray-300 h-72 rounded-md mx-4"></div>
      <div className="bg-gray-300 h-6 w-32 rounded-md mx-4"></div>

      <CardShimmer count={6} />
    </div>
  );
});
