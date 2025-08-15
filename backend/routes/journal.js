
import express from "express";
import JournalEntry from "../models/JournalEntry.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Create new entry
router.post("/", authMiddleware, async (req, res) => {
  const { text, mood, dateOnly } = req.body;
  try {
    const newEntry = new JournalEntry({ user: req.user.id, text, mood, dateOnly });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all entries
router.get("/", authMiddleware, async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await JournalEntry.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
