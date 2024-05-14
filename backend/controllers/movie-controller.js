import jwt from "jsonwebtoken";
import Movie from "../models/Movie.js";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";

export const addMovie = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];
    if (!extractedToken || extractedToken.trim() === "") {
      return res.status(404).json({ message: "Token Not Found" });
    }
  
    //Verify Token
    let adminId;
    jwt.verify(extractedToken, process.env.SECRET_KEY,(err,decrypted) => {
      if (err) {
        return res.status(400).json({message: `${err.message}`});
      } else{
        adminId = decrypted.id;
        return;
      }
    })
  
    // create new movie
    const { title, description, releaseDate, posterUrl, featured, actors } = req.body;
    if (!title || title.trim() === "" || !description || description.trim() === "" || !releaseDate || releaseDate.trim() === "" || !posterUrl || posterUrl.trim() === "") {
      return res.status(422).json({ message: "Invalid Inputs" });
    }    

    let movie;
    try {
      movie = new Movie({
        title,
        description,
        releaseDate: new Date(`${releaseDate}`),
        featured,
        actors,
        admin: adminId,
        posterUrl,
      });

      const session = await mongoose.startSession();
      const adminUser = await Admin.findById(adminId);
      session.startTransaction();
      await movie.save({session});
      adminUser.addedMovie.push(movie);
      await adminUser.save({session});
      await session.commitTransaction();
      // return res.status(201).json({ movie });
    } catch (err) {
      return console.log(err);
    }

    if(!movie){
      return res.status(500).json({message:"Request Failed"});
    }

    return res.status(201)
  };
  

export const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json({ movies });
  } catch (err) {
    return res.status(500).json({ message: "Request Failed", error: err });
  }
};

export const getMovieById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Invalid Movie ID" });
    }
    return res.status(200).json({ movie });
  } catch (err) {
    return res.status(500).json({ message: "Request Failed", error: err });
  }
};
