import { Router } from "express";
import { userController } from "./user.controller";

// route define
const router = Router();

// Get All users routes
router.get("/users", userController.getAllUsers);

// Update single user
router.put("/users/:userId", userController.updateUser);

// Delete single user
router.delete("/users/:userId", userController.deleteUser);

// name export
export const userRoutes = router;
