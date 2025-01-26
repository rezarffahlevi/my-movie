import React, { FC } from "react";
import { IMG_404 } from "../../utils/constants";
import { minutesToHours } from "../../utils/utils";
import { LabelInfo } from "../label/LabelInfo";
import { useBreakpoint } from "../../hooks/useBreakpoint";

type Props = {
  poster: string | undefined;
  title: string | undefined;
  tagline: string | undefined;
  overview: string | undefined;
  releaseDate: string | undefined;
  adult: boolean | undefined;
  country: string | undefined;
  genres: string | undefined;
  runtime: string | number | undefined;
  voteAverage: number | undefined;
  voteCount: number | undefined;
  director: string | undefined;
  directorRole: string | undefined;
  writer: string | undefined;
  writerRole: string | undefined;
};

export const SectionMovieHeader: FC<Props> = React.memo((props) => {
  const breakpoints = useBreakpoint();
  return (
    <div className="bg-gradient-to-b from-black via-transparent to-black bg-opacity-90 md:flex items-center justify-center py-8 md:px-6 lg:px-40">
      <img
        src={props?.poster}
        alt={props?.title}
        className="min-md:h-[50vh] max-sm:mb-8 max-md:w-3/5 max-md:mx-auto rounded-xl object-cover transform transition duration-300 group-hover:scale-75"
        onError={(e) => {
          e.currentTarget.src = IMG_404;
        }}
      />
      <div className="ml-8">
        <label className="font-bold text-3xl">
          {props?.title}{" "}
          <label className="font-normal">
            ({new Date(props?.releaseDate ?? "").getFullYear()})
          </label>
        </label>
        <div className="flex items-center py-2">
          <div className="border-gray-400 border p-1 rounded-lg w-10 text-center text-gray-400">
            {props?.adult ? "17+" : "13+"}
          </div>
          <label className="ml-2">{props?.releaseDate}</label>
          <label className="ml-2">{props?.country}</label>
          <div className="hidden lg:flex ml-4 mr-2 h-2 w-2 rounded-xl bg-white" />
          <label className="hidden lg:flex">{props.genres}</label>
          <div className="ml-4 mr-2 h-2 w-2 rounded-xl bg-white" />
          <label>{minutesToHours(Number(props.runtime))}</label>
        </div>
        <div className="lg:hidden flex items-center my-4">
          <div className="mr-2 h-2 w-2 rounded-xl bg-white" />
          <label className="">{props.genres}</label>
        </div>
        <div className="flex text-2xl items-center">
          <img src="/assets/icons/star.png" className="h-6 mr-2" />{" "}
          {props?.voteAverage} ({props?.voteCount} Votes)
        </div>
        <p className="text-xl text-gray-300 italic">{props?.tagline}</p>
        <p className="text-lg font-bold pt-2 pb-1">Overview</p>
        <p className="">{props?.overview}</p>
        <div className="flex gap-36 mt-8">
          <LabelInfo label={props?.director} value={props?.directorRole} />
          {props?.writer && props?.writer != props?.director && (
            <LabelInfo label={props?.writer} value={props?.writerRole} />
          )}
        </div>
      </div>
    </div>
  );
});
