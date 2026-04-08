const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const User = require("./models/User");
const Task = require("./models/Task");
const auth = require("./middleware/auth");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DB =================
mongoose.connect("mongodb://127.0.0.1:27017/akash")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ================= AUTH =================

// REGISTER
app.post("/api/v1/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// LOGIN (✅ FIXED)
app.post("/api/v1/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, "secretkey");

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= TASK =================

// CREATE
app.post("/api/v1/tasks", auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      userId: req.user.id
    });

    await task.save();

    res.status(201).json({ message: "Task created" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL (FILTER + SEARCH + PAGINATION)
app.get("/api/v1/tasks", auth, async (req, res) => {
  try {
    const { status, priority, search, page = 1, limit = 10 } = req.query;

    let query = { userId: req.user.id };

    if (status) query.status = status;
    if (priority) query.priority = priority;

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET SINGLE
app.get("/api/v1/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    res.status(200).json(task);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
app.put("/api/v1/tasks/:id", auth, async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    res.status(200).json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// STATUS UPDATE
app.patch("/api/v1/tasks/:id/status", auth, async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status: req.body.status },
      { new: true }
    );

    res.status(200).json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
app.delete("/api/v1/tasks/:id", auth, async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    res.status(200).json({ message: "Task deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= DASHBOARD =================
app.get("/api/v1/dashboard", auth, async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({ userId: req.user.id });

    const statusBreakdown = {
      TODO: await Task.countDocuments({ userId: req.user.id, status: "TODO" }),
      IN_PROGRESS: await Task.countDocuments({ userId: req.user.id, status: "IN_PROGRESS" }),
      DONE: await Task.countDocuments({ userId: req.user.id, status: "DONE" })
    };

    const overdueTasks = await Task.countDocuments({
      userId: req.user.id,
      due_date: { $lt: new Date() }
    });

    res.status(200).json({
      totalTasks,
      statusBreakdown,
      overdueTasks
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= SERVER =================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});