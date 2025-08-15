import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// -------------------- GET all posts --------------------
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ _id: -1 });
    res.json(posts);
  } catch (err) {
    console.error("GET posts error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// -------------------- POST a new post --------------------
router.post("/", async (req, res) => {
  try {
    const { content, postedBy } = req.body;
    console.log("Incoming post:", req.body);

    if (!content) return res.status(400).json({ error: "Post content required" });

    const post = new Post({ content, postedBy });
    await post.save();

    res.status(201).json(post);
  } catch (err) {
    console.error("POST post error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// -------------------- POST a comment to a specific post --------------------
router.post("/:postId/comments", async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, postedBy } = req.body;

    if (!content) return res.status(400).json({ error: "Comment content required" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const comment = {
      content,
      postedBy: postedBy || "Anonymous",
      timestamp: new Date().toLocaleString(),
    };

    post.comments.push(comment);
    await post.save();

    res.status(201).json(comment);
  } catch (err) {
    console.error("POST comment error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// -------------------- GET comments for a specific post --------------------
router.get("/:postId/comments", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    res.json(post.comments);
  } catch (err) {
    console.error("GET comments error:", err.message);
    res.status(500).json({ error: err.message });
  }
});
router.post("/:id/upvote", async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    if (!post.upvotedBy) post.upvotedBy = [];

    const alreadyUpvoted = post.upvotedBy.includes(userId);

    if (alreadyUpvoted) {
      post.likes = Math.max(0, post.likes - 1);
      post.upvotedBy = post.upvotedBy.filter((id) => id !== userId);
    } else {
      post.likes += 1;
      post.upvotedBy.push(userId);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// DELETE a post by ID
router.delete("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await Post.findByIdAndDelete(postId);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;