import Journal from "../models/Journal.js";
import CommunityPost from "../models/CommunityPost.js";

// Get recent journal entries (latest 3)
export const getRecentJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(3);
    res.json(journals);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recent journals" });
  }
};

// Get mood trend (last 7 days)
export const getMoodTrend = async (req, res) => {
  try {
    const last7 = await Journal.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(7)
      .select("mood createdAt");

    const formatted = last7.map(entry => ({
      date: entry.createdAt.toISOString().split("T")[0],
      mood: entry.mood
    }));

    res.json(formatted.reverse());
  } catch (err) {
    res.status(500).json({ message: "Error fetching mood trend" });
  }
};

// Get journal stats
export const getJournalStats = async (req, res) => {
  try {
    const total = await Journal.countDocuments({ user: req.user._id });

    // streak logic
    const streak = 0; // implement if you track daily usage

    res.json({ total, streak });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};

// Get recent community posts
export const getCommunityHighlights = async (req, res) => {
  try {
    const posts = await CommunityPost.find()
      .sort({ createdAt: -1 })
      .limit(3);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching community posts" });
  }
};

// Get motivational tip
export const getMotivationalTip = async (req, res) => {
  const tips = [
    "Your story matters, keep writing it.",
    "Even the smallest step is progress.",
    "Consistency beats intensity."
  ];
  const tip = tips[Math.floor(Math.random() * tips.length)];
  res.json({ tip });
};
