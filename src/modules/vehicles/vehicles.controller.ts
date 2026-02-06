import { Request, Response } from "express";
import { vehicleServices } from "./vehicles.services";

// Vehicles Create
const createVehicle = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const result = await vehicleServices.createVehicle(req.body);
    //
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
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

// Get All Vehicles
const getAllVehicles = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const result = await vehicleServices.getAllVehicles();
    //
    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
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

// Get single Vehicles
const getSingleVehicles = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;
  try {
    const result = await vehicleServices.getSingleVehicles(vehicleId as string);

    // Not found
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Success
    res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Name export
export const vehicleController = {
  createVehicle,
  getAllVehicles,
  getSingleVehicles,
};
