import { Router } from "express";
import { bookingController } from "./booking.controller";
import authGuard from "../../middleware/auth";

// route define
const router = Router();

// Booking post route
router.post(
  "/bookings",
  authGuard("admin", "Customer"),
  bookingController.createBooking,
);

// Get all bookings
router.get(
  "/bookings",
  authGuard("admin", "Customer"),
  bookingController.getAllBookings,
);

// Update single booking
router.put(
  "/bookings/:bookingId",
  authGuard("admin"),
  bookingController.updateSingleBooking,
);

// Name export
export const bookingsRoutes = router;
