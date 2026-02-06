import { pool } from "../../config/db";

// Vehicles Create
const createVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `INSERT INTO vehicles (
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ],
  );

  return result;
};

// Get All Vehicles
const getAllVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};

// Get single Vehicles
const getSingleVehicles = async (id: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
  return result;
};

// Delete single vehicle
const deleteVehicle = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM vehicles
       WHERE id = $1
       `,
    [id],
  );
  //
  return result;
};
// Name export
export const vehicleServices = {
  createVehicle,
  getAllVehicles,
  getSingleVehicles,
  deleteVehicle,
};
