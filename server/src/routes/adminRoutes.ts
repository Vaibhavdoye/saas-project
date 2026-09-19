import express, { Request, Response } from "express";
import User from "../models/User";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/users", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only.",
      });
    }

    const users = await User.find().select("-password");

    res.json({
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
});

export default router;