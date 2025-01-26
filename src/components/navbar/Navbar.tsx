import React, { FC, useCallback, useState } from "react";
import { Link, useCanGoBack, useRouter } from "@tanstack/react-router";
import { CATEGORIES } from "../../utils/constants";
import { MovieListParams } from "../../services/movie/type";

type Props = {
  state: MovieListParams;
  setState: Function;
};
export const Navbar: FC<Props> = React.memo((props) => {
  const [keyword, setKeyword] = useState("");

  let timeoutId: ReturnType<typeof setTimeout>;
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        props.setState((prevState: MovieListParams) => ({
          ...prevState,
          keyword: e.target.value,
          page: 1, // reset page when search keyword changes
        }));
      }, 500);
    },
    [props.setState]
  );

  return (
    <div className="sticky bg-[#1f2937] z-50 top-0 p-3 flex justify-between content-between">
      <Link
        to="/"
        activeProps={{
          className: "font-bold text-2xl ",
        }}
        activeOptions={{ exact: true }}
      >
        Movie Explorer
      </Link>
      {/* <Link
        to="/about"
        activeProps={{
          className: "font-bold",
        }}
      >
        About
      </Link> */}
      {/* Search Bar and Category */}
      <div className="flex items-center">
        {/* Search Input */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={keyword}
            onChange={handleSearch}
          />
          <button className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-300 hover:text-white">
            🔍
          </button>
        </div>

        {/* Category Select */}
        <select
          className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
          onChange={(e) => {
            props.setState((prevState: MovieListParams) => ({
              ...prevState,
              category: e.target.value,
              page: 1, // reset page when category changes
            }));
          }}
          value={props.state.category}
        >
          {keyword == "" ? (
            CATEGORIES.map((item: string, i: number) => (
              <option
                key={"category-" + i}
                // selected={item == props.state.category}
              >
                {item}
              </option>
            ))
          ) : (
            <option>All Category</option>
          )}
        </select>
      </div>
    </div>
  );
});

type NavbarWithBackProps = {
  title: string | undefined;
};
export const NavbarWithBack: FC<NavbarWithBackProps> = React.memo((props) => {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  return (
    <div className="sticky bg-[#1f2937] z-50 top-0 p-3 flex content-between">
      {canGoBack ? (
        <button
          onClick={() => router.history.back()}
          className="text-2xl font-bold px-4 flex"
        >
          <img
            src={"/assets/icons/arrow-back.svg"}
            className="h-9"
          />
          {props.title}
        </button>
      ) : null}
    </div>
  );
});
