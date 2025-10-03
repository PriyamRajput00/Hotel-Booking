import express, { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string; // ✅ extend Request with userId
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload & {
      userId: string;
    };

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

export default verifyToken;
