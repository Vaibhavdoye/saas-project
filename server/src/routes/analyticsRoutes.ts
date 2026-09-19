import express, { Request, Response } from "express";
import User from "../models/User";
import Project from "../models/Project";
import Task from "../models/Task";
import Subscription from "../models/Subscription";
import Payment from "../models/Payment";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only.",
      });
    }

    const totalUsers = await User.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalTasks = await Task.countDocuments();

    const activeSubscriptions = await Subscription.countDocuments({
      status: "active",
    });

    const successfulPayments = await Payment.find({
      status: "success",
    });

    const totalRevenue = successfulPayments.reduce(
      (total, payment) => total + payment.amount,
      0
    );

    res.json({
      analytics: {
        totalUsers,
        totalProjects,
        totalTasks,
        activeSubscriptions,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch analytics",
    });
  }
});

export default router;