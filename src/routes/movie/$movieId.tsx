import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  useGetMovieCredits,
  useGetMovieDetail,
} from "../../services/movie/useMovieService";
import { BASE_URL_IMAGE, IMG_404 } from "../../utils/constants";
import { minutesToHours, numberFormat } from "../../utils/utils";
import { NavbarWithBack } from "../../components/navbar/NNavbar";
import { Crew } from "../../services/movie/type";
import { MovieDetailShimmer } from "../../components/shimmer/MovieDetailShimmer";
import { SectionMovieHeader } from "../../components/section/SSectionMovieHeader";
import { LabelInfo } from "../../components/label/LLabelInfo";
import { CastCard } from "../../components/card/CCastCard";

export const Route = createFileRoute("/movie/$movieId")({
  component: DetailComponent,
});

function DetailComponent() {
  const { movieId } = Route.useParams();

  const movie = useGetMovieDetail(movieId);
  const credits = useGetMovieCredits(movieId);

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  }, []);

  const director: Crew | undefined = React.useMemo(() => {
    return credits.data?.crew.find((crew) => {
      return crew.job === "Director";
    });
  }, [credits]);

  const directorRole: Crew[] | undefined = React.useMemo(() => {
    return credits.data?.crew.filter((crew) => {
      return crew.name === director?.name;
    });
  }, [credits]);

  const writer: Crew | undefined = React.useMemo(() => {
    return credits.data?.crew.find((crew) => {
      return crew.job === "Writer";
    });
  }, [credits]);

  const writerRole: Crew[] | undefined = React.useMemo(() => {
    return credits.data?.crew.filter((crew) => {
      return crew.name === writer?.name;
    });
  }, [credits]);

  return (
    <div>
      <NavbarWithBack title={"Back"} />
      {movie.isFetching ? (
        <MovieDetailShimmer />
      ) : movie.isError ? (
        <div className="text-2xl text-center p-12">
          {movie.failureReason?.message}
        </div>
      ) : (
        <>
          <SectionMovieHeader
            poster={BASE_URL_IMAGE + movie.data?.poster_path}
            title={movie.data?.title}
            releaseDate={movie.data?.release_date}
            adult={movie.data?.adult}
            country={movie.data?.production_countries
              .at(0)
              ?.iso_3166_1.toLocaleUpperCase()}
            genres={movie.data?.genres.map((genre) => genre.name).join(", ")}
            voteAverage={movie.data?.vote_average}
            voteCount={movie.data?.vote_count}
            runtime={movie.data?.runtime}
            overview={movie.data?.overview}
            tagline={movie.data?.tagline}
            director={director?.name}
            directorRole={directorRole?.map((dt) => dt.job)?.join(", ")}
            writer={writer?.name}
            writerRole={writerRole?.map((dt) => dt.job)?.join(", ")}
          />

          <p className="text-2xl pt-8 pb-2 px-20">Top Billed Cast</p>
          <div className="overflow-x-auto mx-20 mb-20 py-4">
            <div className="flex ">
              {credits.data?.cast.map((cast) => (
                <CastCard
                  key={cast.id}
                  avatar={BASE_URL_IMAGE + cast.profile_path}
                  name={cast.name}
                  character={cast.character}
                />
              ))}
            </div>
          </div>

          <div className="flex-wrap flex gap-x-32 gap-y-8 mt-8 mx-20 mb-20">
            <LabelInfo
              label={"Production Company"}
              value={movie.data?.production_companies
                .map((dt) => dt.name)
                .join(", ")}
            />
            <LabelInfo
              label={"Production Country"}
              value={movie.data?.production_countries
                .map((dt) => dt.name)
                .join(", ")}
            />
            <LabelInfo label={"Status"} value={movie.data?.status} />
            <LabelInfo
              label={"Budget"}
              value={
                (movie.data?.budget ?? 0) > 1
                  ? `$${numberFormat(movie.data?.budget ?? 0, ",")}`
                  : `-`
              }
            />
            <LabelInfo
              label={"Revenue"}
              value={
                (movie.data?.revenue ?? 0) > 1
                  ? `$${numberFormat(movie.data?.revenue ?? 0, ",")}`
                  : `-`
              }
            />
            <LabelInfo
              label={"Origin Country"}
              value={movie.data?.origin_country.join(", ")}
            />
            <LabelInfo
              label={"Origin Languange"}
              value={movie.data?.original_language.toUpperCase()}
            />
            <LabelInfo label={"Popularity"} value={movie.data?.popularity} />
            <LabelInfo
              label={"Spoken Languange"}
              value={movie.data?.spoken_languages
                .map((dt) => dt.name)
                .join(", ")}
            />
          </div>
        </>
      )}
    </div>
  );
}
