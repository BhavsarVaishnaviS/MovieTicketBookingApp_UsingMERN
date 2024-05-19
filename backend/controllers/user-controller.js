import Bookings from "../models/Bookings.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Function to get all users
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }

  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occurred" });
  }
  return res.status(200).json({ users });
};

// Function to handle user signup
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (
    !name &&
    !email &&
    !password &&
    name.trim() === "" &&
    email.trim() === "" &&
    password.trim() === ""
  ) {
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

  return res.status(201).json({ id: user._id });
};

// Function to update a user
export const updateUser = async (req, res,next) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    if (
      (!name || name.trim() === "") &&
      (!email || email.trim() === "") &&
      (!password || password.trim() === "")
    ) {
      return res.status(422).json({ message: "Invalid Inputs" });
    }
    let hashedPassword;
    if (password && password.trim() !== "") {
      try {
        hashedPassword = await bcrypt.hash(password, 10);
      } catch (err) {
        return res.status(500).json({ message: "Error hashing password" });
      }
    }
    let user;
    try {
      const updateData = {};
      if (name && name.trim() !== "") updateData.name = name;
      if (email && email.trim() !== "") updateData.email = email;
      if (hashedPassword) updateData.password = hashedPassword;
      user = await User.findByIdAndUpdate(id, updateData, { new: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Updated Successfully", user });
  };

// Function to delete a user
export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndDelete(id);
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(200).json({ message: "Deleted Successfully" });
};

// Function to handle user login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Unable to find user from this ID" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  return res.status(200).json({ message: "Login Successful" });
};

// Function to get bookings of a user
export const getBookingsOfUser = async (req, res, next) => {
  const id = req.params.id;
  let bookings;
  try {
    bookings = await Bookings.find({ user: id });
  } catch (err) {
    return console.log(err);
  }
  if(!bookings){
    return res.status(500).json({message:"Unable to get Booking"})
  }
  return res.status(200).json({ bookings });
};

// Function to get a user by ID
export const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occurred" });
  }
  return res.status(200).json({ user });
};
