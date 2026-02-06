import { Router } from "express";
import { userController } from "./user.controller";
import authGuard from "../../middleware/auth";

// route define
const router = Router();

// Get All users routes
router.get("/users", authGuard("admin"), userController.getAllUsers);

// Update single user
router.put("/users/:userId", authGuard("admin"), userController.updateUser);

// Delete single user
router.delete("/users/:userId", authGuard("admin"), userController.deleteUser);

// name export
export const userRoutes = router;
