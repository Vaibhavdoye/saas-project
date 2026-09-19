import express, { Request, Response } from "express";
import Task from "../models/Task";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, description, project } = req.body;

    const task = await Task.create({
      title,
      description,
      project,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Task creation failed",
    });
  }
});
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({
      project: (req.query.project as string),
    });

    res.json({
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        status,
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Task update failed",
    });
  }
});
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Task deletion failed",
    });
  }
});
export default router;