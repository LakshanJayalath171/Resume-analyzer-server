import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import resumeRoutes from "./routes/resumeRoutes.js";

// app config
const app = express();
const port = process.env.PORT || 8000;

// database connection
connectDB();

// cloudinary connection
connectCloudinary();


// middleware
app.use(cors());

app.use(express.json());


// api routes
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use("/api/resume", resumeRoutes);

// listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});