import express from 'express';
import { deleteBooking, getBookingById, newBooking } from '../controllers/booking-controller.js'; // added .js extension

const bookingsRouter = express.Router();

bookingsRouter.get('/:id', getBookingById);
bookingsRouter.post('/', newBooking);
bookingsRouter.delete('/:id', deleteBooking);

export default bookingsRouter;
