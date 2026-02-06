import { Request, Response } from "express";
import { authServices } from "./auth.services";

// singUp User +++++++++++++++++
const singUpUser = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const result = await authServices.singUpUser(req.body);
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

// Signin user +++++++++++++++++
const signinUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signinUser(req.body);
    //
    res.status(200).json({
      success: true,
      message: "Login Successfully",
      data: result,
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
export const authController = {
  singUpUser,
  signinUser,
};
