import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function WatchList() {
  const [watchList, setWatchList] = useState([]);

  return (
    <>
      <header>
        <h1 className="text-5xl font-extrabold">My Watchlist</h1>
        <Link className="font-bold hover:underline" to="/">
          Search for movies
        </Link>
      </header>
      <main className="flex-center w-[80%] h-[50dvh] mx-auto">
        {watchList.length > 0 ? (
          <section>
            <h1>WatchList goes here </h1>
          </section>
        ) : (
          <section className="flex-center flex-col gap-y-2">
            <h3 className="text-2xl text-gray-400/50 font-bold">
              Your watchlist is looking a little empty...
            </h3>
            <Link
              className="font-bold text-xl flex items-center gap-x-1.5"
              to="/"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                  clipRule="evenodd"
                />
              </svg>

              <span>Let’s add some movies!</span>
            </Link>
          </section>
        )}
      </main>
    </>
  );
}
