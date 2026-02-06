import { Request, Response } from "express";
import { bookingServices } from "./booking.services";

// Booking post ++++++++++++++++
const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBooking(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All bookings
const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getAllBookings();
    //
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
    // console.log(result.rows[0]);
    //
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update single booking
const updateSingleBooking = async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  try {
    const result = await bookingServices.updateSingleBooking(
      bookingId as string,
      req.body,
    );

    // Not found
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    //
    res.status(200).json({
      success: true,
      message: "Booking marked as returned. Vehicle is now available",
      data: result.rows[0],
    });
    //
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Name export
export const bookingController = {
  createBooking,
  getAllBookings,
  updateSingleBooking,
};
