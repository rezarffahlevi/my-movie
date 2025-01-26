import React, { FC } from "react";
import { IMG_404 } from "../../utils/constants";

type Props = {
  image: string;
  title: string;
  description?: string | null | undefined;
  year: number;
  id?: string | number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const MovieCard: FC<Props> = React.memo((props) => {
  return (
    <button
      key={props.id}
      className="relative p-4 basis-1/2 sm:basis-1/3 md:basis-1/5 xl:basis-1/6 text-center justify-items-center group"
      onClick={props.onClick}
    >
      <img
        src={props.image}
        alt={props.title}
        className="rounded-sm object-cover transform transition duration-300 group-hover:scale-75"
        onError={(e) => {
          e.currentTarget.src = IMG_404;
        }}
      />
      <p className="pt-2 group-hover:opacity-0">
        {props?.title} ({props.year})
      </p>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-300 content-end p-4">
        <h3 className="text-white text-lg font-bold">
          {props.title} ({props.year})
        </h3>
        <p className="text-white text-sm line-clamp-2 mt-2">
          {props.description}
        </p>
      </div>
    </button>
  );
});
