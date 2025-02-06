import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../App";

const RatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieId = queryParams.get("movieId"); // ფილმის ID query string-იდან

  const isDarkMode = useContext(ThemeContext);
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    alert(`You rated the movie: ${rating} stars!`);
    navigate(`/movie/${movieId}`); // ფილმის დეტალებზე დაბრუნება
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: isDarkMode ? "#121212" : "white",
        color: isDarkMode ? "white" : "black",
        minHeight: "100vh",
      }}
    >
      <h1>Rate the Movie</h1>
      <p>Movie ID: {movieId}</p>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            style={{
              fontSize: "24px",
              margin: "5px",
              backgroundColor: star <= rating ? "gold" : "gray",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              cursor: "pointer",
            }}
          >
            {star}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Submit Rating
      </button>
      <br />
      <button
        onClick={() => navigate(`/movie/${movieId}`)} // უკან დაბრუნება ფილმის დეტალებზე
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Back to Movie
      </button>
    </div>
  );
};

export default RatePage;
