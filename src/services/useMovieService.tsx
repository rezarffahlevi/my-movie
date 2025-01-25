import {
  DefinedInfiniteQueryObserverResult,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { fetcher } from "../utils/fetcher";

export type BaseResponse<TResult> = {
  dates: Dates;
  page: number;
  results: TResult;
  total_pages: number;
  total_results: number;
};

interface Dates {
  maximum: string;
  minimum: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type MovieListParams = {
  category: string;
  keyword: string;
};

// Queries
export const useGetMovieList = (params: MovieListParams) => {
  const list = useInfiniteQuery({
    queryKey: [params.category],
    queryFn: ({ pageParam }) => {
      return fetcher("/movie/now_playing", {
        queryParams: {
          page: pageParam,
        },
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPageParam >= lastPage.total_pages) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
  return list;
};
