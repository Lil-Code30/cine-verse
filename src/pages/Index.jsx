import { useState } from "react";
import { Link } from "react-router-dom";

import NoMovieImg from "../assets/images/no-movie.png";
import MovieCard from "../components/MovieCard";

export default function Index({
  watchList,
  addMovieToWatchList,
  removeMovieFromWatchList,
}) {
  //state
  const [movie, setMovie] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // static variables
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  // fetch movie data
  const fetchMovieData = async (movie) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          movie
        )}`,
        API_OPTIONS
      );
      const data = await res.json();

      if (data.results.length === 0) {
        setErrorMsg(
          `Unable to find what you’re looking for. Please try another search`
        );
        return;
      }
      setAllMovies(data.results);
    } catch (err) {
      setErrorMsg(`Failed : ${err}`);
    }
  };

  // function to handle the form
  async function handleSubmit(formData) {
    const movie = formData.get("movie");
    if (!movie) {
      setErrorMsg("Please enter a movie name");
      return;
    }
    await fetchMovieData(movie);
  }

  // movie card mapping
  const movieCardEl = allMovies.map((movie) => {
    return (
      <MovieCard
        key={movie.id}
        movie={movie}
        watchList={watchList}
        addMovieToWatchList={addMovieToWatchList}
        removeMovieFromWatchList={removeMovieFromWatchList}
      />
    );
  });

  return (
    <>
      <header>
        <h1 className="text-5xl font-extrabold">Find your film</h1>
        <Link className="font-bold hover:underline" to="/watchlist">
          My Watchlist
        </Link>
      </header>
      <main className="flex flex-col item-center justify-center">
        <form
          action={handleSubmit}
          className="bg-white gap-x-1 -translate-y-6 w-[80%] md:w-[60%] lg:w-[50%] h-[40px] mx-auto flex justify-between border border-gray-500 rounded"
        >
          <div className="flex ml-1 items-center text-gray-800 gap-x-1 w-[90%] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              className="w-full focus:outline-none"
              type="text"
              name="movie"
              id="movie"
              placeholder="Search for a movie"
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
            />
          </div>
          <button className="bg-gray-300 text-gray-800 rounded-r px-2">
            Search
          </button>
        </form>
        <section className="px-8 md:w-[80%] mx-auto my-3">
          {errorMsg ? (
            <h2 className="text-red-500 text-2xl font-bold">{errorMsg}</h2>
          ) : movie ? (
            movieCardEl
          ) : (
            <div className="flex flex-col gap-3 h-[50dvh] justify-center items-center">
              <img src={NoMovieImg} alt="" />
              <h4 className="text-[#DFDDDD] text-2xl font-bold">
                Start exploring
              </h4>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
