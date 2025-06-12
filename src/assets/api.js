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
export async function fetchMovieData(movie) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        movie
      )}`,
      API_OPTIONS
    );
    return await res.json();
  } catch (err) {
    console.log(`Failed : ${err}`);
  }
}

// fetch popular movies
export async function fetchPopularMovies() {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular",
      API_OPTIONS
    );
    const data = await res.json();
    return data.results.slice(0, 5);
  } catch (err) {
    console.log(err);
  }
}
