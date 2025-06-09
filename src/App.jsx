import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import WatchList from "./pages/WatchList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/watchlist" element={<WatchList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
