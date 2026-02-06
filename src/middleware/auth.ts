import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

//
const authGuard = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // verify authHeader
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Accessed",
      });
    }
    // get token from authHeader
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(
        token as string,
        config.jwt_secret as string,
      ) as JwtPayload;
      //
      req.user = decoded;
      //Check role
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }
      //   Call the next function
      next();
      //
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    //
  };
};

// default export
export default authGuard;
