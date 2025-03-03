
import { Request, Response, NextFunction } from "express";

const ADMIN_IDS = ["your-replit-user-id"]; // Replace with your Replit user ID

export function adminOnly(req: Request, res: Response, next: NextFunction) {
  const userId = req.headers["x-replit-user-id"];
  
  if (!userId || !ADMIN_IDS.includes(userId.toString())) {
    res.status(403).json({ message: "Admin access required" });
    return;
  }

  next();
}
