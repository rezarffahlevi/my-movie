import { Link } from "@tanstack/react-router";

export const Navbar = () => {
  return (
    <div className="sticky bg-[#1f2937] z-50 top-0 p-3 flex justify-between content-between">
      <Link
        to="/"
        activeProps={{
          className: "font-bold text-2xl ",
        }}
        activeOptions={{ exact: true }}
      >
        My Movie
      </Link>
      {/* <Link
        to="/about"
        activeProps={{
          className: "font-bold",
        }}
      >
        About
      </Link> */}{/* Search Bar and Category */}
      <div className="flex items-center">
        {/* Search Input */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-300 hover:text-white">
            🔍
          </button>
        </div>

        {/* Category Select */}
        <select
          className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
        >
          <option value="all">All Categories</option>
          <option value="movies">Movies</option>
          <option value="books">Books</option>
          <option value="games">Games</option>
        </select>
      </div>
    </div>
  );
};
