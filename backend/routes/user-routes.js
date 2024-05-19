import express from "express";
import { getAllUsers, deleteUser, getBookingsOfUser, login, signup, updateUser } from '../controllers/user-controller.js';

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", signup);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);
userRoutes.post("/login", login);
userRoutes.get("/bookings/:id", getBookingsOfUser);

export default userRoutes;
