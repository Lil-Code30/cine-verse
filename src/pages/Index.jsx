import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

import NoMovieImg from "../assets/images/no-movie.png";
import MovieCard from "../components/MovieCard";

import { useDebounce } from "../assets/CustomHooks";
import { fetchMovieData, fetchPopularMovies } from "../assets/api";

export default function Index({
  watchList,
  addMovieToWatchList,
  removeMovieFromWatchList,
}) {
  //state
  const [movie, setMovie] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [popularMovies, setPopularMovies] = useState([]);

  const debounceInput = useDebounce(movie, 500);

  // function to handle the form
  async function handleSubmit(formData) {
    const movie = formData.get("movie");
    if (!movie) {
      setErrorMsg("Please enter a movie name");
      return;
    }

    try {
      const data = await fetchMovieData(movie);

      if (data.results.length === 0) {
        setErrorMsg(
          `Unable to find what you’re looking for. Please try another search`
        );
        return;
      }

      setAllMovies(data.results);
      setErrorMsg(""); // initialize the error msg back to default value
    } catch (err) {
      setErrorMsg(`failed : ${err}`);
    }
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

  // display movies when the user type
  useEffect(() => {
    async function displayMovie() {
      if (debounceInput) {
        try {
          const data = await fetchMovieData(debounceInput);

          if (data.results.length === 0) {
            setErrorMsg(
              `Unable to find what you’re looking for. Please try another search`
            );
            return;
          }

          setAllMovies(data.results);
          setErrorMsg(""); // initialize the error msg back to default value
        } catch (err) {
          setErrorMsg(`failed : ${err}`);
        }
      }
    }

    displayMovie();
  }, [debounceInput]);

  //display popular movie
  useEffect(() => {
    async function displayPopularMovies() {
      try {
        const data = await fetchPopularMovies();

        setPopularMovies(data);
      } catch (err) {
        setErrorMsg(`Failed to fetch popular movies. ${err}`);
      }
    }

    displayPopularMovies();
  }, []);

  const popularMoviesElements = popularMovies.map((el, index) => {
    return (
      <div key={nanoid()} className="relative">
        <h1 className="absolute text-6xl font-extrabold bottom-12 ml-2 text-indigo-600 bg-black rounded px-1">
          {index + 1}
        </h1>
        <div>
          <img
            className="rounded-lg"
            src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
            alt={el.title}
          />
          <h2>{el.title}</h2>
        </div>
      </div>
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
        <section className=" mx-3 ">
          <h1 className="my-1.5 text-3xl font-semibold">Top 05 Movies</h1>
          <div className="flex item-center justify-center gap-x-2.5">
            {popularMoviesElements}
          </div>
          <hr className="border border-gray-400 mt-5 rounded" />
        </section>
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
