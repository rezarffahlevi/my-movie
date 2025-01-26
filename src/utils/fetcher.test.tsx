import { fetcher } from "./fetcher";
import { BASE_URL, TOKEN } from "./constants";
import { objectToQueryParams } from "./utils";

// Mocking global fetch
global.fetch = jest.fn();

describe("fetcher", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    (fetch as jest.Mock).mockReset();
  });

  it("should call fetch with the correct URL, headers and return data when successfull", async () => {
    const mockResponse = { data: "test" };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const url = "/movie/now_playing";
    const params = {
      method: "GET",
      queryParams: { page: 1 },
    };

    const result = await fetcher(url, params);

    expect(fetch).toHaveBeenCalledWith(
      BASE_URL + url + objectToQueryParams(params.queryParams),
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "Bearer " + TOKEN,
        }),
      })
    );
    expect(result).toEqual(mockResponse);
  });

  it("should call onError callback if provided on error", async () => {
    const mockErrorResponse = { error: "Something went wrong" };
    const onError = jest.fn();
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => mockErrorResponse,
    });

    const url = "/movie/now_playing";
    await fetcher(url, { onError });

    expect(onError).toHaveBeenCalledWith(mockErrorResponse);
  });

  it("should throw an error if fetch fails and no onError is provided", async () => {
    const mockErrorResponse = { error: "Failed to fetch data" };
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => mockErrorResponse,
    });

    const url = "/movie/now_playing";
    await expect(fetcher(url)).rejects.toThrow("Failed to fetch data");
  });

  it("should send POST request with body if provided", async () => {
    const mockResponse = { data: "test" };
    const body = { key: "value" };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const url = "/movie/now_playing";
    const params = {
      method: "POST",
      body: body,
    };

    const result = await fetcher(url, params);

    expect(fetch).toHaveBeenCalledWith(
      BASE_URL + url,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(body),
      })
    );
    expect(result).toEqual(mockResponse);
  });
});
