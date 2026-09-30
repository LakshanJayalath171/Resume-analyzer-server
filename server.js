import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";

// app config
const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

// api routes
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

// listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});