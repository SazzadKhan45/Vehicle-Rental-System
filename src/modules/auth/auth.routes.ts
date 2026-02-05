import { Router } from "express";
import { authController } from "./auth.controller";

// auth route define
const router = Router();

// Signup User route
router.post("/auth/signup", authController.createUser);

// Name export
export const authRoutes = router;
