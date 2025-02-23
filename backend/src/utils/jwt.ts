import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY as string;

export interface AuthRequest extends Request {
  user?: any; // Adjust the type according to your decoded JWT payload
}

// Function to generate a JWT token
export const generateToken = (id: any): string => {
  return jwt.sign({ id }, secretKey, {
    expiresIn: "10d",
  });
};

// ✅ Fix return type to `void`
export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return; // 🚀 Ensure function stops execution
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden: Invalid token" });
    return; // 🚀 Stop execution here too
  }
};
