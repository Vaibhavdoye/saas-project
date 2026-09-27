import express, { Request, Response } from "express";
import { Resend } from "resend";

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/send", async (req: Request, res: Response) => {
  try {
    const { to, subject, message } = req.body;

    const { data, error } = await resend.emails.send({
      from: "SaaS Application <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      text: message,
    });

    if (error) {
      console.error("Resend Error:", error);

      return res.status(500).json({
        message: "Failed to send email",
        error,
      });
    }

    res.json({
      message: "Email sent successfully",
      data,
    });
  } catch (error) {
    console.error("Email Error:", error);

    res.status(500).json({
      message: "Failed to send email",
    });
  }
});

export default router;