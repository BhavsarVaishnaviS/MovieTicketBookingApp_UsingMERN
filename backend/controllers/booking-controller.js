import mongoose from "mongoose";
import Movie from "../models/Movie.js";
import User from "../models/User.js";
import Bookings from "../models/Bookings.js";

export const newBooking = async (req, res, next) => {
    const { movie, date, seatNumber, user } = req.body;

    try {
        // Check if the user value is a valid ObjectId

        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingMovie = await Movie.findById(movie);
        if (!existingMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        // Create new booking with valid ObjectId for user
        const booking = new Bookings({
            movie: existingMovie._id,
            date: new Date(date),
            seatNumber,
            user: new mongoose.Types.ObjectId(user) // Correctly use 'new' keyword
        });

        await booking.save();
        // Update the user's document to include the new booking
        existingUser.bookings.push(booking._id);
        await existingUser.save();

        return res.status(201).json({ booking });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getBookingById = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try{
        booking = await Bookings.findById(id);
    }catch(err){
        return console.log(err);
    }
    if(!booking){
        return res.status(500).json({message: "Unexpected Error"});
    }
    return res.status(200).json({booking});
};

export const deleteBooking = async (req, res, next) => {
    const id = req.params.id;

    let booking;
    try {
        booking = await Bookings.findByIdAndDelete(id).populate("user").populate("movie");
    
        // const session = await mongoose.startSession();
        // session.startTransaction();
        // await booking.user.bookings.pull(booking);
        // await booking.movie.bookings.pull(booking);
        // await booking.user.save({ session });
        // await booking.movie.save({ session });
        // session.commitTransaction();
    } catch (err) {
        return console.log(err);
        // return res.status(500).json({ message: "Internal server error" });
    }
    if(!User){
        return res.status(500).json({ message: "Internal server error" });
    }
    if(!Movie){
        return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json({ message: "Successfully Deleted" });

};
