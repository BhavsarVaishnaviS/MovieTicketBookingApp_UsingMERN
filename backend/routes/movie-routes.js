import express from "express";
import {
  addMovie,
  getAllMovies,
  getMovieById,
} from "../controllers/movie-controller.js";

const movieRouter = express.Router();

// Route to add a new movie
movieRouter.post("/", addMovie);
// Route to get all movies
movieRouter.get("/", getAllMovies);
// Route to get a movie by its ID
movieRouter.get("/:id", getMovieById);

export default movieRouter;
