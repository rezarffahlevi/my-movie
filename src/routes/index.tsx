import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../components/navbar/navbar";
import {
  useGetMovieList,
} from "../services/movie/useMovieService";
import { BASE_URL_IMAGE } from "../utils/constants";
import { MovieCard } from "../components/card/movieCard";
import { InfiniteScroll } from "../components/scroll/infiniteScroll";
import { Movie, MovieListParams } from "../services/movie/type";

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
    if (!movies.isFetching) {
      onRefresh();
    }
  }, [state]);

  const onLoadMore = React.useCallback(() => {
    console.log(state, movies.isFetching, movies.hasNextPage, 'loadmore');
    
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
  
  return (
    <div className="">
      <Navbar state={state} setState={setState} />
      <InfiniteScroll
        load={onLoadMore}
        hasMore={movies.hasNextPage}
        loader={<h4 className="text-center text-xl p-6 pb-10">Loading...</h4>}
        endMessage={
          !movies.isFetching && (
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
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
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
