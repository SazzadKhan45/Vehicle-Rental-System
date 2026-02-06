import { Router } from "express";
import { authController } from "./auth.controller";

// auth route define
const router = Router();

// Signup User route
router.post("/auth/signup", authController.singUpUser);

// Signin user route
router.post("/auth/signin", authController.signinUser);

// Name export
export const authRoutes = router;
