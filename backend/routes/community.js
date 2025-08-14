import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create post
router.post("/", async (req, res) => {
  try {
    const { content, postedBy } = req.body;
    if (!content || !postedBy) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newPost = new Post({ content, postedBy });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete post
router.delete("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    await Post.findByIdAndDelete(postId);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
