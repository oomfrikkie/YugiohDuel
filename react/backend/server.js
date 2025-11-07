import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import DuelHistory from "./Models/History.js";

dotenv.config();

const app = express();
app.use(cors()); // <-- this fixes it
app.use(express.json());


// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB!"))
  .catch((err) => console.error("❌ Connection failed:", err));

// POST route to save a duel
app.post("/api/duels", async (req, res) => {
  try {
    const duel = new DuelHistory(req.body);
    await duel.save();
    res.json({ message: "✅ Duel saved!", duel });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to save duel" });
  }
});

// optional — a GET route to view all duels
app.get("/api/duels", async (req, res) => {
  try {
    const duels = await DuelHistory.find().sort({ date: -1 }); // newest first
    res.json(duels);
  } catch (err) {
    console.error("❌ Error fetching duels:", err);
    res.status(500).json({ error: "Failed to fetch duels" });
  }
});


// start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
