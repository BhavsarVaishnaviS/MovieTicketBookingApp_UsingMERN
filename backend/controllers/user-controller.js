import Bookings from '../models/Bookings.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export default async function getAllUsers(req,res, next) {
    let users;
    try{
        users = await User.find();
    }catch (err){
        return console.log(err);
    }

    if(!users){
        return res.status(500).json({message: "Unexpected Error Occured"});
    }
    return res.status(200).json({users});
}

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name && !email && !password && name.trim() === "" && email.trim() === "" && password.trim() === "") {
        return res.status(422).json({ message: "Invalid Inputs" });
    }

const hashedPassword = bcrypt.hashSync(password);
    let user;
    try {
        user = new User({ name, email, password: hashedPassword });
        user = await user.save(); // Save the user to the database
    } catch (err) {
        return console.log(err);
    }

    if (!user) {
        return res.status(500).json({ message: "Unexpected Error Occurred" });
    }

    return res.status(201).json({ id:user._id });
};
export const updateUser = async (req, res, next) => {
    const { id, name, email, password } = req.body;
    let user;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Update the user if it exists, or insert a new one
        user = await User.findByIdAndUpdate(id,{
                name,
                email,
                password: hashedPassword,
            });
    } catch (errr) {
        return console.log(errr);
    }
    if (!user) {
        return res.status(500).json({ message: "Something went wrong" });
    }
    res.status(200).json({message: "Updated Sucessfully"}); 
};

export const deleteUser = async (req,res,next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findByIdAndDelete(id);
    }catch(err){
        return console.log(err);
    }
    if(!user){
        return res.status(500).json({ message: "Something went wrong" });
    }
    return res.status(200).json({message: "Delete Successfully"});
};

export const login = async(req,res,next) => {
    const {email, password} = req.body;
    if (!email && !password && email.trim() === "" && password.trim() === "") {
        return res.status(422).json({ message: "Invalid Inputs" });
    }
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err){
        return console.log(err);
    }

    if(!existingUser){
        return res
        .status(404)
        .json({message:"Unable to find user from this ID"});
    }

    const isPasswordCorrect =bcrypt.compareSync(password,existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message: "IncorrectPassword"});
    }

    return res.status(200).json({message: "Login Successfull"});
}

export const getBookingsOfUser = async (req, res, next) => {
    const id = req.params.id;
    let bookings;
    try{
        bookings=await Bookings.find({ user: id});
    } catch(err){
        return console.log(err);
    }
    if(!bookings){
        return res.status(500).json({message: "Unable to get Booking"});
    }
    return res.status(200).json({bookings});
};