import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_KEY = "4bcc16dce61a3bec384c3df4bf720b60";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

const fetchMovieDetail = async (id: string) => {
  const response = await axios.get<Movie>(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );
  return response.data;
};

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery<Movie>(["movie", id], () => fetchMovieDetail(id));

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching movie</p>;

  return (
    <div className="container mx-auto">
      <button
        onClick={() => navigate("/")}
        className="ml-2 mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Back
      </button>
      <div className="mt-4">
        <h1 className="text-3xl font-bold">Movie Detail</h1>
        <p className="text-gray-600">Movie ID: {id}</p>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover mb-4 rounded-md"
        />
        <h2 className="text-2xl font-semibold mb-2">{movie.title}</h2>
        <p className="text-gray-700 mb-4">{movie.overview}</p>
        <p>
          <strong>IMDb Rating:</strong> {movie.vote_average}
        </p>
        <button
          onClick={() => navigate(`/rate?movieId=${id}`)}
          className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
        >
          Rate this Movie
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;
