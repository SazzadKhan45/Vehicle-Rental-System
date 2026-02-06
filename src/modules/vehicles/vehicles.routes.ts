import { Router } from "express";
import { vehicleController } from "./vehicles.controller";
import authGuard from "../../middleware/auth";

// router define
const router = Router();

//Vehicles Post route ++++++++++++++++++++
router.post("/vehicles", authGuard("admin"), vehicleController.createVehicle);

//Get All Vehicles route ++++++++++++++++++++
router.get("/vehicles", vehicleController.getAllVehicles);

//Get Single Vehicles  route ++++++++++++++++++++
router.get("/vehicles/:vehicleId", vehicleController.getSingleVehicles);

//Update Single Vehicles route ++++++++++++++++++++
// router.put("/vehicles/:vehicleId");

//Delete Single Vehicles route ++++++++++++++++++++
router.delete(
  "/vehicles/:vehicleId",
  authGuard("admin"),
  vehicleController.deleteVehicle,
);

// name export
export const vehiclesRoutes = router;
