import { Request, Response } from "express";
import { authServices } from "./auth.services";

// Create user +++++++++++++++++
const createUser = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const result = await authServices.createUser(req.body);
    //
    res.status(201).json({
      success: true,
      message: "User registered successfully",
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

// Name export
export const authController = {
  createUser,
};
