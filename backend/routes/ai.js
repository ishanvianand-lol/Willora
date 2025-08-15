// ai.js
import express from "express";
import authMiddleware from "../middleware/auth.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Initialize the Google Generative AI client with the API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Default supportive system prompt
const defaultPrompt = `
You are a friendly, caring, and understanding assistant that reads personal journal entries. Your goals:

1. Identify the user's current mood.
2. Respond empathetically and encourage the user, matching their feelings.
3. Only suggest ways to improve emotional well-being if the user expresses stress, sadness, or negative emotions. Do NOT force suggestions if the user is already happy or neutral.
4. Always maintain a supportive, non-judgmental, and positive tone.
5. If the entry mentions sensitive topics (self-harm, suicide, or thoughts of harming others):
   - Respond with empathy.
   - Encourage seeking professional help or contacting appropriate support services.
   - Never provide instructions or detailed advice on these topics.
6. If the entry mentions illegal or dangerous actions (e.g., theft, violence, sexual assault):
   - Respond empathetically.
   - Suggest seeking professional or legal help if appropriate.
   - Never give legal advice or instructions.
7. Avoid making assumptions about the user's behavior or intentions.
8. Keep responses concise, clear, and comforting.
9. Do not enforce a fixed format, bullet points, or number of suggestions. Only provide what is helpful.

Focus entirely on emotional support and understanding, not judgment, instructions, or criticism.
`;

router.post("/analyze", authMiddleware, async (req, res) => {
  const { journalText } = req.body;
  if (!journalText) {
    return res.status(400).json({ message: "No text provided" });
  }

  try {
    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content with the default prompt + user journal
    const result = await model.generateContent(`${defaultPrompt}\n\nUser's journal entry:\n${journalText}`);
    const aiMessage = result.response?.text() || "No response from AI";

    res.json({ aiMessage });
  } catch (err) {
    console.error("AI API error:", err.message);
    res.status(500).json({
      message: "AI analysis failed",
      error: err.message,
    });
  }
});

export default router;