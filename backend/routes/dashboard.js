import express from "express";
import {
  getRecentJournals,
  getMoodTrend,
  getJournalStats,
  getCommunityHighlights,
  getMotivationalTip
} from "../controllers/dashboardController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/recent-journals", protect, getRecentJournals);
router.get("/mood-trend", protect, getMoodTrend);
router.get("/stats", protect, getJournalStats);
router.get("/community", protect, getCommunityHighlights);
router.get("/tip", protect, getMotivationalTip);

export default router;
