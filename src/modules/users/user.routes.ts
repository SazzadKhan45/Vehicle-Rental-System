import { Router } from "express";
import { userController } from "./user.controller";

// route define
const router = Router();

// Get All users routes
router.get("/users", userController.getAllUsers);

// Update single user
router.put("/users/:userId", userController.updateUser);

// name export
export const userRoutes = router;
