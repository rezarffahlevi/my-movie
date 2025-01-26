import { BASE_URL, TOKEN } from "./constants";
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
        "Bearer " + TOKEN,
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
