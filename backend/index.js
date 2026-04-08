const express = require("express");
const connectDB = require("./config/db");

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Server chal raha hai 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});