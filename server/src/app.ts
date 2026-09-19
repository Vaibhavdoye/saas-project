import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import authMiddleware from "./middleware/authMiddleware";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";
import adminRoutes from "./routes/adminRoutes";
import emailRoutes from "./routes/emailRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
app.set("io", io);

io.on("connection", (socket) => {
  console.log("WebSocket client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("WebSocket client disconnected:", socket.id);
  });
});

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "SaaS Application Backend is Running",
  });
});
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You have access to this protected route",
    user: (req as any).user,
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});