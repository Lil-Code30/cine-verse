import NoPoster from "../assets/images/noposter.png";
import { useState } from "react";

export default function MovieCard({ movie }) {
  const [watchList, setWatchList] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || []
  );

  const imageURL = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `${NoPoster}`;

  // function to return the year of release
  function returnYear(date) {
    let wholeDate = new Date(date);

    return wholeDate.getFullYear();
  }

  // function to add a movie to the watchList
  const handleWatchList = () => {
    setWatchList((prevValue) => {
      return [...prevValue, movie];
    });
  };

  localStorage.setItem("watchlist", JSON.stringify(watchList));

  // verify if a movie is already in the watchlist
  const isInWatchList = watchList.find((el) => el.id === movie.id);

  return (
    <div className="flex gap-x-4  items-center last-of-type:border-b-0 border-b-2 border-gray-400/50 pb-5 my-3">
      <div>
        <img
          className="max-w-[215px] h-[325px] rounded-xl"
          src={imageURL}
          alt={movie.title}
        />
      </div>
      <div className="self-start mt-6">
        <div className="flex items-center mb-2.5">
          <h1 className="md:text-2xl font-semibold mr-4">{movie.title}</h1>{" "}
          <h5 className="flex-center self-center gap-x-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 fill-yellow-400"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">{movie.vote_average.toFixed(1)}</span>
          </h5>
        </div>
        <div className="flex my-3 gap-x-5">
          <span>
            {movie.original_language[0].toUpperCase() +
              movie.original_language.slice(1)}
          </span>
          <span>{returnYear(movie.release_date)}</span>
          {isInWatchList ? (
            <button className="flex-center gap-x-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Remove</span>
            </button>
          ) : (
            <button onClick={handleWatchList} className="flex-center gap-x-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Watchlist</span>
            </button>
          )}
        </div>
        <p className="line-clamp-5 text-gray-600">{movie.overview}</p>
      </div>
    </div>
  );
}
