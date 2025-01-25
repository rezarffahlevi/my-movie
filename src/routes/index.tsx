import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../components/navbar/navbar";
import {
  Movie,
  MovieListParams,
  useGetMovieList,
} from "../services/useMovieService";
import InfiniteScroll from "react-infinite-scroll-component";
import { BASE_URL_IMAGE } from "../utils/constants";
import { MovieCard } from "../components/card/movieCard";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [state, setState] = React.useState<MovieListParams>({
    category: "Now Playing",
    keyword: "",
  });

  const movies = useGetMovieList(state);

  React.useEffect(() => {
    if(!movies.isFetching) {
      movies.refetch();
    }
  }, [state])

  const onLoadMore = React.useCallback(() => {
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
    [movies]
  );

  return (
    <div className="">
      <Navbar state={state} setState={setState} />
      <InfiniteScroll
        dataLength={totalItems ?? 0}
        next={onLoadMore}
        hasMore={movies.hasNextPage}
        loader={<h4>Loading...</h4>}
        endMessage={
          !movies.isFetching && (
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          )
        }
        refreshFunction={onRefresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }
      >
        <div className="flex flex-wrap p-4 w-full content-between">
          {/* {movies.data?.results?.map((movie: Movie, i: number) => (
            <MovieCard
              key={i + movie.id}
              id={movie.id}
              image={BASE_URL_IMAGE + movie.poster_path}
              title={movie?.title}
              year={new Date(movie.release_date).getFullYear()}
            />
          ))} */}

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
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
