import { useState, useEffect } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

import { type Movie } from "../types";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (search: string) => {
    setErrorMessage("");
    setLoading(true);
    
    try {

      const endpoint = search && search.length > 3 ?  `${API_BASE_URL}/search/movie?query=${encodeURIComponent(search)}` : `${API_BASE_URL}/movie/popular?sort_by=popularity.desc&page=1`;      

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      if(data.results.length === 0) {
        setErrorMessage("No movies found. Please try a different search term.");
        setMovies([]);
        return;
      }

      console.log("Fetched movies data:", data.results);
      
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500); // Simulate loading delay
    }
  };

  useEffect(() => {
    // if (searchTerm && searchTerm.length > 4) {
    //   console.log("Fetching movies for search term:", searchTerm);
      
    // }
    fetchMovies(searchTerm);
  }, [searchTerm]);

  return (
    <main className="px-4 mb-12">
      <div className="container">
      <img src="/movie-search-hero.webp" alt="Movie Search" className="mx-auto mt-6 w-48 md:w-72 lg:w-96" />
      <h1 className="text-center text-4xl md:text-6xl font-medium my-10">Find Your Favorite Movie</h1>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="mt-10">
        <h2 className="text-xl mb-2">All Movies</h2>
        { loading ? (

          <Spinner />

        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
      </div>
    </main>
  );
}

export default App;