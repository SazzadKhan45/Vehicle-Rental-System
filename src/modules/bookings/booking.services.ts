import { pool } from "../../config/db";

// Booking post ++++++++++++++++
const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
  // console.log(payload);

  //  Get vehicle price
  const vehicleResult = await pool.query(
    `SELECT vehicle_name, daily_rent_price
     FROM vehicles
     WHERE id = $1`,
    [vehicle_id],
  );

  if (vehicleResult.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const { vehicle_name, daily_rent_price } = vehicleResult.rows[0];

  //  Calculate rent days
  const start = new Date(rent_start_date as string);
  const end = new Date(rent_end_date as string);

  const rentDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

  if (rentDays <= 0) {
    throw new Error("Invalid rent dates");
  }

  //  Calculate total price
  const total_price = rentDays * Number(daily_rent_price);

  //  Insert booking
  const bookingResult = await pool.query(
    `
    INSERT INTO bookings (
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      "active",
    ],
  );
  console.log({
    ...bookingResult.rows[0],
    vehicle: {
      vehicle_name,
      daily_rent_price,
    },
  });

  //  Shape response
  return {
    ...bookingResult.rows[0],
    vehicle: {
      vehicle_name,
      daily_rent_price,
    },
  };
};

// Get All bookings
const getAllBookings = async () => {
  const result = await pool.query(`SELECT * FROM bookings`);
  //
  return result;
};

// Update single bookings
const updateSingleBooking = async (
  id: string,
  payload: Record<string, unknown>,
) => {
  const { status } = payload;
  //
  const result = await pool.query(
    `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id],
  );
  //
  return result;
};

// Name export
export const bookingServices = {
  createBooking,
  getAllBookings,
  updateSingleBooking,
};
