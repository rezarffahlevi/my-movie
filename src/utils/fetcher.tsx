import { BASE_URL } from "./constants";
import { objectToQueryParams } from "./utils";

type FetchOptions = {
  urlPath?: string;
  header?: any;
  queryParams?: any;
  body?: any;
  option?: any;
  onError?: Function;
  method?: "GET" | "POST" | "PUT" | "DELETE";
};

export const fetcher = async (url: string, params: FetchOptions) => {
  let option = {
    method: params?.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWE4MDk0ZGE4YjMzYjMxMGIzZDViYjgxYTI2YmE5YSIsIm5iZiI6MTczNzc4OTAzNi4zNzMsInN1YiI6IjY3OTQ4ZTZjNDRlZjM5Yzg2MDE4N2RmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LycrQuf-LSxX3rzKNRW7II-ZlhpQh8KSwyNkz6ZXIGg",
      ...params?.header,
    },
    ...params?.option,
  };
  if (params?.body) {
    option.body = JSON.stringify(params?.body);
  }
  const res = await fetch(
    BASE_URL + url + objectToQueryParams(params?.queryParams),
    option
  );
  if (!res.ok) {
    if (params?.onError) {
      return params?.onError(await res.json());
    } else {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch data");
    }
  }
  return await res.json();
};
