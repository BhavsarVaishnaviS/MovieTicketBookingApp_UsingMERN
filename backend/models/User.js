import mongoose from "mongoose";
import bookings from "../models/Bookings.js";

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true, 
        minLength:6,
    },
    bookings:[{type : mongoose.Types.ObjectId, ref:"Booking"}],
})

export default mongoose.model("User", userSchema);