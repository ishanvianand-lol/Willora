import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  mood: { type: String, required: true },
  dateOnly: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("JournalEntry", journalSchema);