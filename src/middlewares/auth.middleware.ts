// src/middlewares/auth.middleware.ts

import { NextFunction, Request, Response } from "express";
import { UserRole } from "../interfaces/user.interface.js";
import jwt from "jsonwebtoken";


// Extend Express Request interface locally to handle our custom user payload safely
export interface AuthenticatedRequest extends Request{
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  // Expecting incoming header format: "Bearer <token_string>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Access Denied: Missing or malformed authorization token context." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET || "fallback_secret_key");
    (req as AuthenticatedRequest).user = decoded as any; 
    next(); // Pass control smoothly to the next handler block
  } catch (err) {
    res.status(403).json({ error: "Access Denied: Session token is invalid or expired." });
  }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const user = (req as AuthenticatedRequest).user;

  if (!user || user.role !== "admin") {
    res.status(403).json({ error: "Access Denied: This operation requires administrative privileges." });
    return;
  }

  next();
};