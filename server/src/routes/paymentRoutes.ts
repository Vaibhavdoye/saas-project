import express, { Request, Response } from "express";
import Payment from "../models/Payment";
import Subscription from "../models/Subscription";
import authMiddleware from "../middleware/authMiddleware";
import generateInvoice from "../utils/invoice";

const router = express.Router();

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { subscriptionId, amount } = req.body;

    const subscription = await Subscription.findOne({
      _id: subscriptionId,
      user: (req as any).user.userId,
    });

    if (!subscription) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }

    const transactionId = `SIM-${Date.now()}`;

    const payment = await Payment.create({
      user: (req as any).user.userId,
      subscription: subscriptionId,
      amount,
      status: "success",
      paymentMethod: "simulated",
      transactionId,
    });
      generateInvoice({
  transactionId: payment.transactionId,
  amount: payment.amount,
  status: payment.status,
  paymentMethod: payment.paymentMethod,
  createdAt: payment.createdAt,
});

    res.status(201).json({
      message: "Simulated payment successful",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Payment processing failed",
    });
  }
});

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const payments = await Payment.find({
      user: (req as any).user.userId,
    }).sort({ createdAt: -1 });

    res.json({
      payments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch payment history",
    });
  }
});

export default router;