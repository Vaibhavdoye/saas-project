import express, { Request, Response } from "express";
import User from "../models/User";
import Project from "../models/Project";

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
router.delete("/users/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only.",
      });
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user",
    });
  }
});
router.get(
  "/projects",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      if (user.role !== "admin") {
        return res.status(403).json({
          message: "Access denied. Admin only.",
        });
      }

      const projects = await Project.find()
        .populate("owner", "name email")
        .sort({ createdAt: -1 });

      res.json({
        projects,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch projects",
      });
    }
  }
);
router.delete(
  "/projects/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      if (user.role !== "admin") {
        return res.status(403).json({
          message: "Access denied. Admin only.",
        });
      }

      const deletedProject = await Project.findByIdAndDelete(req.params.id);

      if (!deletedProject) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      res.json({
        message: "Project deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete project",
      });
    }
  }
);

export default router;