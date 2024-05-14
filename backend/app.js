import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // Import cors package
import userRoutes from './routes/user-routes.js';
import adminRouter from './routes/admin-routes.js';
import movieRouter from './routes/movie-routes.js';

import dotenv from 'dotenv';
import bookingsRouter from "./routes/booking-routes.js";
dotenv.config();

const app = express();

app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000'
  }));

//middlewares
app.use("/user", userRoutes);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

const PORT = 4000;

// Ensure proper configuration for transactions
mongoose.connect('mongodb://localhost:27017/movieTicket', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 60000 // Increase timeout to 60 seconds
})
.then(() => {
    app.listen(PORT, () => {
        console.log("Connected to Database and Server is Running");
    });
})
.catch((e) => console.log(e));
