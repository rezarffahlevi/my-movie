import { Link } from "@tanstack/react-router";
import React, { FC } from "react";

type Props = {
  image: string;
  title: string;
  description?: string | null | undefined;
  year: number;
  id?: string | number;
};

export const MovieCard: FC<Props> = React.memo((props) => {
  const imgNotFound = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
  return (
    <Link
      key={props.id}
      to={"/detail/" + props.id}
      className="relative p-4 basis-1/6 text-center justify-items-center group"
    >
      <img
        src={props.image}
        alt={props.title}
        className="rounded-sm self-center object-cover transform transition duration-300 group-hover:scale-75"
        onError={(e) => {
          e.currentTarget.src = imgNotFound;
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
    </Link>
  );
});
