import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { fetcher } from "../../utils/fetcher";
import { useGetMovieList } from "./useMovieService";
import { MovieListParams } from "./type";
import { act } from "react";

jest.mock("./useMovieService", () => ({
  useGetMovieList: jest.fn(),
}));
jest.mock("../../utils/fetcher");

//defining React Query Wrapper
const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

// mocking the response for Car Event Api
const mockResponse = {
  dates: {
    maximum: "2025-01-29",
    minimum: "2024-12-18",
  },
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: "/b85bJfrTOSJ7M5Ox0yp4lxIxdG1.jpg",
      genre_ids: [28, 878, 35, 10751],
      id: 939243,
      original_language: "en",
      original_title: "Sonic the Hedgehog 3",
      overview:
        "Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched in every way, Team Sonic must seek out an unlikely alliance in hopes of stopping Shadow and protecting the planet.",
      popularity: 7240.445,
      poster_path: "/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg",
      release_date: "2024-12-19",
      title: "Sonic the Hedgehog 3",
      video: false,
      vote_average: 7.837,
      vote_count: 1014,
    },
  ],
  total_pages: 1,
  total_results: 1,
};

describe("useMovieService", () => {
  // beforeEach test BeforeEach function will run and clear the mock and UseQuery
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });
  const params: MovieListParams = {
    category: "Now Playing",
    keyword: "",
  };

  it("should fetch movie list data successfully", async () => {
    (useGetMovieList as jest.Mock).mockReturnValue({
      data: mockResponse,
      isFetching: false,
      isError: false,
    });
    const { result } = renderHook(() => useGetMovieList(params), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isFetching).toBe(false));
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toEqual(mockResponse);
  });

  it("should handle errors correctly", async () => {
    (useGetMovieList as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
      isError: true,
    });

    const { result } = renderHook(() => useGetMovieList(params), {
      wrapper,
    });

    await waitFor(() => expect(!result.current.isFetching).toBeTruthy());
    expect(result.current.data).toBeNull();
    expect(result.current.isError).toBeTruthy();
  });
});
