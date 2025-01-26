import * as React from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Navbar } from "../../components/navbar/Navbar";
import { useGetMovieList } from "../../services/movie/useMovieService";
import { BASE_URL_IMAGE } from "../../utils/constants";
import { MovieCard } from "../../components/card/MovieCard";
import { InfiniteScroll } from "../../components/scroll/InfiniteScroll";
import { Movie, MovieListParams } from "../../services/movie/type";
import { CardShimmer } from "../../components/shimmer/CardShimmer";

export const MovieComponent = () => {
  const [state, setState] = React.useState<MovieListParams>({
    category: "Now Playing",
    keyword: "",
  });
  const router = useRouter();

  const movies = useGetMovieList(state);

  React.useEffect(() => {
    if (!movies.isFetching) {
      onRefresh();
    }
  }, [state]);

  const onLoadMore = React.useCallback(() => {
    console.log(state, movies.isFetching, movies.hasNextPage, "loadmore");

    if (!movies.isFetching) movies.fetchNextPage();
  }, [state, movies]);

  const onRefresh = React.useCallback(() => {
    movies.refetch();
  }, [state]);

  const totalItems = React.useMemo(
    () =>
      movies.data?.pages.reduce(
        (total, page) => total + (page?.results?.length ?? 0),
        0
      ),
    [movies, state]
  );

  const onClickMovie = React.useCallback((id: number) => {
    router.navigate({ to: "/movie/" + id });
  }, []);

  return (
    <div className="">
      <Navbar state={state} setState={setState} />

      <InfiniteScroll
        load={onLoadMore}
        hasMore={movies.hasNextPage}
        loader={<CardShimmer count={6} />}
        endMessage={
          movies.isFetching ? (
            <CardShimmer />
          ) : (
            <p style={{ textAlign: "center" }}>
              <b>
                {movies.isError
                  ? movies.failureReason?.message
                  : `Yay! You have seen it all`}
              </b>
            </p>
          )
        }
      >
        <div className="flex flex-wrap p-4 w-full content-between">
          {movies?.data?.pages?.map((group, i) => (
            <React.Fragment key={i}>
              {group.results?.map((movie: Movie) => (
                <MovieCard
                  key={i + movie.id}
                  id={movie.id}
                  image={BASE_URL_IMAGE + movie.poster_path}
                  title={movie?.title}
                  description={movie?.overview}
                  year={new Date(movie.release_date).getFullYear()}
                  onClick={() => {
                    onClickMovie(movie?.id);
                  }}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export const Route = createFileRoute("/movie/")({
  component: MovieComponent,
});
