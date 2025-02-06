import React from "react";
import { Link } from "react-router-dom";
import useMovies from "../hooks/useMovies";

const MovieList = () => {
  const { data: movies, isLoading, isError } = useMovies();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching movies</p>;

  const staticMovies = [
    {
      id: 1,
      title: "Inception",
      overview: "A mind-bending thriller.",
      vote_average: 8.8,
      poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
    {
      id: 2,
      title: "The Matrix",
      overview: "A hacker discovers the truth.",
      vote_average: 8.7,
      poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    },
    {
      id: 3,
      title: "Interstellar",
      overview: "A journey beyond the stars.",
      vote_average: 8.6,
      poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
  ];

  const combinedMovies = movies?.length ? movies : staticMovies;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {combinedMovies.map((movie) => (
          <div key={movie.id} className="border p-4 rounded-md shadow-md">
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-40 object-cover mb-2 rounded-md"
              />
              <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
            </Link>
            <p className="text-gray-700 mb-2">{movie.overview}</p>
            <p>
              <strong>IMDb Rating:</strong> {movie.vote_average}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
