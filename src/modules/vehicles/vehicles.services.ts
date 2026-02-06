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

// Update single vehicle
const updateVehicle = async (id: string, payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `UPDATE vehicles
     SET vehicle_name = $1, type = $2, registration_number = $3, daily_rent_price = $4, availability_status = $5
     WHERE id = $6
     RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ],
  );

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
  updateVehicle,
  deleteVehicle,
};
