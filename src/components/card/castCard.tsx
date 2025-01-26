import React from "react";
import { BASE_URL_IMAGE, IMG_404 } from "../../utils/constants";

type Props = {
  avatar: string | undefined;
  name: string | undefined;
  character: string | undefined;
};

export const CastCard: React.FC<Props> = React.memo((props) => {
  return (
    <div
      className="w-40 items-center mr-6 flex-shrink-0 bg-[#1f2937] rounded-lg"
    >
      <img
        src={BASE_URL_IMAGE + props.avatar}
        alt={props.name}
        className="w-40 h-30 object-cover rounded-lg"
        onError={(e) => {
          e.currentTarget.src = IMG_404;
        }}
      />
      <p className="mx-2 mt-3 font-bold">{props.name}</p>
      <p className="mx-2 mb-3 text-sm">{props.character}</p>
    </div>
  );
});
