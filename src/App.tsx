import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import FormPage from "./components/FormPage";
import RatePage from "./components/RatePage";
import "./index.css";

export const ThemeContext = React.createContext(false);

const queryClient = new QueryClient();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={isDarkMode}>
        <div className={isDarkMode ? "dark" : "light"}>
          <button
            onClick={toggleTheme}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
          <Router>
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/form" element={<FormPage />} />
              <Route path="/rate" element={<RatePage />} />
            </Routes>
          </Router>
        </div>
      </ThemeContext.Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
