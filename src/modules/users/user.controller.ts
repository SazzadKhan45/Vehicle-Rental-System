import { Request, Response } from "express";
import { userServices } from "./user.services";

// Get all users ++++++++++++++
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
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

// Update single user +++++++++++++
const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log({ id: userId });
  try {
    const result = await userServices.updateUser(userId as string, req.body);

    // Not found
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //
    res.status(200).json({
      success: true,
      message: "User updated successfully",
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

// Delete single user
const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const result = await userServices.deleteUser(userId as string);

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
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Name export
export const userController = {
  getAllUsers,
  updateUser,
  deleteUser,
};
