import express, { Request, Response } from "express";
import transporter from "../config/email";

const router = express.Router();

router.post("/send", async (req: Request, res: Response) => {
  try {
    const { to, subject, message } = req.body;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message,
    });

    res.json({
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email Error:", error);

    res.status(500).json({
      message: "Failed to send email",
    });
  }
});

export default router;