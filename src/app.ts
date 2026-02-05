import express, { Request, Response } from "express";
import initDb from "./config/db";
import { userRoutes } from "./modules/users/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";

//
const app = express();

// parser
app.use(express.json());

// Testing get api
app.get("/", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: `Express Server is running on port : ${process.env.PORT}`,
  });
});

// Db initialized
initDb();

// Auth CURD +++++++++++++++++
app.use("/api/v1", authRoutes);

// Users CURD +++++++++++++++++
app.use("/api/v1", userRoutes);

// Not Fount Api
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Routes Not Found !",
    path: req.path,
  });
});

// default export
export default app;
