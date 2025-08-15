// routes/stats.js
import express from "express";
import JournalEntry from "../models/JournalEntry.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.js"; // your auth middleware

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch user info
    const user = await User.findById(userId).select("name email");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Total journal entries
    const totalEntries = await JournalEntry.countDocuments({ user: userId });

    // Average mood (convert moods to numbers if needed)
    const journals = await JournalEntry.find({ user: userId });
    let averageMood = 0;
    if (journals.length > 0) {
      const moodMap = { "Very Sad": 1, "Sad": 2, "Neutral": 3, "Happy": 4, "Very Happy": 5 }; // adjust based on your moods
      const totalMood = journals.reduce((sum, j) => sum + (moodMap[j.mood] || 3), 0);
      averageMood = (totalMood / journals.length).toFixed(1);
    }

    // Streak calculation
    let streak = 0;
    if (journals.length > 0) {
      const dates = journals.map(j => j.dateOnly).sort((a, b) => new Date(b) - new Date(a));
      let today = new Date().toISOString().split("T")[0];
      for (let date of dates) {
        if (date === today) {
          streak++;
          today = new Date(new Date(today) - 86400000).toISOString().split("T")[0];
        } else if (date < today) break;
      }
    }

    // Community posts by username
    const communityPosts = await Post.countDocuments({ postedBy: user.name });

    res.json({
      name: user.name,
      email: user.email,
      totalEntries,
      averageMood,
      streak,
      communityPosts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;