import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Index from "./pages/Index";
import WatchList from "./pages/WatchList";

function App() {
  const [watchList, setWatchList] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || []
  );

  // function to add a movie to the watchList
  const handleWatchList = (movie) => {
    setWatchList((prevValue) => {
      return [...prevValue, movie];
    });
  };

  // remove a movie from the watchlist
  const removeMovie = (movieId) => {
    setWatchList(watchList.filter((el) => el.id !== movieId));
  };

  // store the watch list to the localstorage
  useEffect(() => {
    setWatchList(watchList);
    localStorage.setItem("watchlist", JSON.stringify(watchList));
  }, [watchList]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Index
                watchList={watchList}
                addMovieToWatchList={handleWatchList}
                removeMovieFromWatchList={removeMovie}
              />
            }
          />
          <Route
            path="/watchlist"
            element={
              <WatchList
                watchList={watchList}
                addMovieToWatchList={handleWatchList}
                removeMovieFromWatchList={removeMovie}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
