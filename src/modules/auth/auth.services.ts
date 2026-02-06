import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../../config/db";
import config from "../../config";

// singUp User +++++++++++++++
const singUpUser = async (payload: Record<string, string>) => {
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

// Signin user ++++++++++++++++++++++
const signinUser = async (payload: Record<string, unknown>) => {
  const { email, password } = payload;
  //
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  // verify email
  if (result.rows.length === 0) {
    return {
      success: false,
      message: "User not found",
    };
  }
  //
  const user = result.rows[0];

  // match password by bcrypt
  const matchPass = await bcrypt.compare(password as string, user.password);
  // verify password
  if (!matchPass) {
    return {
      success: false,
      message: "Invalid password",
    };
  }
  // jwt token generate
  const jwt_token = jwt.sign(
    {
      name: user.name,
      email: user.email,
      role: user.role,
    },
    config.jwt_secret as string,
    { expiresIn: "7d" },
  );
  const token = `Bearer ${jwt_token}`;
  console.log({ token: token });
  //
  return { token, user };
};

// Name export
export const authServices = {
  singUpUser,
  signinUser,
};
