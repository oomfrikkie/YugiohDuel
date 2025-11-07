import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  player1: { type: String, required: true },
  player2: { type: String, required: true },
  winner: { type: String, default: "No one" }, // 👈 default string set here
  turns: { type: Number, default: 0 },          // 👈 typo fixed: “defualt” → “default”
  date: { type: Date, default: Date.now },
});

export default mongoose.model("DuelHistory", historySchema);
