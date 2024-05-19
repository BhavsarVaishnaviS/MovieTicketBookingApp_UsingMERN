import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "./MovieItem";

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        if (data && data.movies) {
          setMovies(data.movies);
        } else {
          setError("Failed to fetch movies.");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch movies. Please try again later.");
      });
  }, []);

  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        margin="auto"
        variant="h4"
        padding={2}
        width={"40%"}
        bgcolor={"#900C3F"}
        color={"white"}
        textAlign={"center"}
      >
        All Movies
      </Typography>
      <Box
        width={"100%"}
        margin={"auto"}
        display={"flex"}
        justifyContent={"center"}
        flexWrap={"wrap"}
      >
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          movies.map((movie) => (
            <MovieItem
              key={movie.id}
              id={movie.id}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              title={movie.title}
            />
          ))
        )}
      </Box>
    </Box>
  );
};
