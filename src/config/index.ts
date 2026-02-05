import dotenv from "dotenv";
import path from "path";

//
dotenv.config({ path: path.join(process.cwd(), ".env") });

// Config files
const config = {
  port: process.env.PORT,
  connection_str: process.env.CONNECTION_STR,
};

// default export
export default config;
