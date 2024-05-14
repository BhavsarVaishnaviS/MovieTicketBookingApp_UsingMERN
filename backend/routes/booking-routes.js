import express from 'express';
import { getBookingById, newBooking } from '../controllers/booking-controller.js'; // added .js extension

const bookingsRouter = express.Router();

bookingsRouter.get('/:id', getBookingById);
bookingsRouter.post('/', newBooking);
bookingsRouter.delete('/:id', newBooking);

export default bookingsRouter;
