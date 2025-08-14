import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import dashboardRoutes from "./routes/dashboard.js";
app.use("/api/dashboard", dashboardRoutes);

// Import routes
import authRoutes from "./routes/auth.js";
import communityRoutes from "./routes/community.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/community", communityRoutes);

// Default test route
app.get("/", (req, res) => {
  res.json({ message: "Willora backend is running" });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
});

// Start server AFTER MongoDB is connected
const PORT = process.env.PORT || 5000;
mongoose.connection.once("open", () => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});