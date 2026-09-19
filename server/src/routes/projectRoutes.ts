import express, { Request, Response } from "express";
import Project from "../models/Project";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      owner: (req as any).user.userId,
    });
    const io = req.app.get("io");

io.emit("projectCreated", project);

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: "Project creation failed",
    });
  }
});
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({
      owner: (req as any).user.userId,
    });

    res.json({
      projects,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
});
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
      },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: "Project update failed",
    });
  }
});
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Project deletion failed",
    });
  }
});
export default router;