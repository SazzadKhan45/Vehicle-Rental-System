import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

// Create User +++++++++++++++
const createUser = async (payload: Record<string, string>) => {
  const { name, password, role, phone } = payload;

  if (!payload.email || typeof payload.email !== "string") {
    throw new Error("Invalid email");
  }
  const email = payload.email.toLowerCase();

  //Password Hashed
  const hashedPass = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password, role, phone)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, email, hashedPass, role, phone],
  );
  //
  return result;
};

// Name export
export const authServices = {
  createUser,
};
