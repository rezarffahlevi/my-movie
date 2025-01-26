import {
  DefinedInfiniteQueryObserverResult,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { fetcher } from "../../utils/fetcher";
import { CATEGORIES } from "../../utils/constants";
import { CreditsResponse, MovieDetails, MovieListParams } from "./type.d";

// Queries
export const useGetMovieList = (params: MovieListParams) => {
  let isSearch = params.keyword != "";
  return useInfiniteQuery({
    queryKey: [isSearch ? params.keyword : params.category],
    queryFn: ({ pageParam }) => {
      let url = "/movie/now_playing";
      switch (params.category) {
        case CATEGORIES[0]:
          url = "/movie/now_playing";
          break;
        case CATEGORIES[1]:
          url = "/movie/popular";
          break;
        case CATEGORIES[2]:
          url = "/movie/top_rated";
          break;
        case CATEGORIES[3]:
          url = "/movie/upcoming";
          break;
        default:
          url = "/movie/now_playing";
          break;
      }

      if (isSearch) {
        url = "/search/movie";
      }

      return fetcher(url, {
        queryParams: {
          page: pageParam,
          query: params.keyword,
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
};

export const useGetMovieDetail = (id: string) => {
  return useQuery<MovieDetails>({
    queryKey: ["movie", id],
    queryFn: () => fetcher(`/movie/${id}`),
  });
};

export const useGetMovieCredits = (id: string) => {
  return useQuery<CreditsResponse>({
    queryKey: ["credits", id],
    queryFn: () => fetcher(`/movie/${id}/credits`),
  });
};
