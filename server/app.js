const connectDB = require("./src/config/db");
const express = require("express");

const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "SaaS Application Backend is Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});