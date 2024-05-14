import mongoose from "mongoose";
import bookings from "../models/Bookings.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";
import Bookings from "../models/Bookings.js";

export const newBooking = async (req, res, next) => {
    const { movie, date, seatNumber, user } = req.body;

    try {
        const existingMovie = await Movie.findById(movie);
        const existingUser = await User.findById(user);

        if (!existingMovie) {
            return res.status(404).json({ message: "Movie Not Found With Given ID" });
        }

        if (!existingUser) {
            return res.status(404).json({ message: "User not found with given ID" });
        }

        const booking = new Bookings({
            movie: existingMovie._id,
            date: new Date(date),
            seatNumber,
            user: existingUser._id,
        });

        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.save({ session });
        existingUser.bookings.push(booking);
        existingMovie.bookings.push(booking);
        await existingUser.save({ session });
        await existingMovie.save({ session });
        await session.commitTransaction();
        session.endSession();

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

export const deleteBooking = async () => {
    const id = req.params.id;
    let booking;
    try{
        booking = await Bookings.findByIdAndDelete().populate("user movie");
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.user.save({session});
        await booking.movie.save({session});
        session.commitTransaction()
    }catch(err){
        return console.log(err);
    }
    if(!booking){
        return res.status(500).json({message:"Unable to Delete"});
    }
    return res.status(200).json({message:"Successfully Deleted"});
}