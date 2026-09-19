import express, { Request, Response } from "express";
import Subscription from "../models/Subscription";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { plan } = req.body;

    const subscription = await Subscription.create({
      user: (req as any).user.userId,
      plan,
      status: "active",
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    res.status(201).json({
      message: "Subscription created successfully",
      subscription,
    });
  } catch (error) {
    res.status(500).json({
      message: "Subscription creation failed",
    });
  }
});

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const subscriptions = await Subscription.find({
      user: (req as any).user.userId,
    });

    res.json({
      subscriptions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch subscriptions",
    });
  }
});
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { plan, status } = req.body;

    const subscription = await Subscription.findOneAndUpdate(
      {
        _id: req.params.id,
        user: (req as any).user.userId,
      },
      {
        plan,
        status,
      },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }

    res.json({
      message: "Subscription updated successfully",
      subscription,
    });
  } catch (error) {
    res.status(500).json({
      message: "Subscription update failed",
    });
  }
});

router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const subscription = await Subscription.findOneAndDelete({
      _id: req.params.id,
      user: (req as any).user.userId,
    });

    if (!subscription) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }

    res.json({
      message: "Subscription cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Subscription cancellation failed",
    });
  }
});
export default router;