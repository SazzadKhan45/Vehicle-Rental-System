import { pool } from "../../config/db";

// Get all Users ++++++++++++++++
const getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  //
  return result;
};

// Get single user
const updateUser = async (id: string, payload: Record<string, unknown>) => {
  const { name, email, phone, role } = payload;
  //
  const result = await pool.query(
    `UPDATE users
     SET name = $1, email = $2, phone = $3, role = $4
     WHERE id = $5
     RETURNING *`,
    [name, email, phone, role, id],
  );
  //
  return result;
};

// Name export
export const userServices = {
  getAllUsers,
  updateUser,
};
