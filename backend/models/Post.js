import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  postedBy: { type: String, default: "Anonymous" },
  likes: { type: Number, default: 0 },
  upvotedBy: { type: [String], default: [] },
  comments: [
    {
      content: String,
      timestamp: String,
      postedBy: String,
    },
  ],
  timestamp: { type: String, default: () => new Date().toLocaleString() },
});

export default mongoose.model("Post", postSchema);