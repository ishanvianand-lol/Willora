import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext.jsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

// Assets from HomePage theme
import BlobClay from "../components/assets/blob-clay.svg";
import BlobSage from "../components/assets/blob-sage.svg";
import PaperTexture from "../components/assets/beige-paper.png";

axios.defaults.baseURL = "http://localhost:5000";

const moods = ["😊", "😔", "😡", "😱", "😴", "❤"];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const JournalPage = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [entry, setEntry] = useState("");
  const [mood, setMood] = useState("");
  const [entries, setEntries] = useState([]);
  const [aiResult, setAiResult] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!user || !token) return;
    const fetchEntries = async () => {
      try {
        const res = await axios.get("/api/journal", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!Array.isArray(res.data)) return;
        setEntries(
          res.data.map((e) => ({
            ...e,
            id: e._id,
            date: new Date(e.createdAt).toLocaleString(),
            dateOnly: new Date(e.createdAt).toDateString(),
          }))
        );
      } catch (err) {
        console.error("Error fetching entries:", err);
      }
    };
    fetchEntries();
  }, [user, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!user || !token) return setShowLoginAlert(true);
    if (!entry.trim()) {
      setErrorMessage("Please write something before saving.");
      return;
    }
    if (!mood) {
      setErrorMessage("Please select your current mood.");
      return;
    }

    const tempEntry = {
      id: Date.now(),
      text: entry,
      mood,
      date: new Date().toLocaleString(),
      dateOnly: new Date().toDateString(),
    };
    setEntries([tempEntry, ...entries]);
    setEntry("");
    setMood("");
    setAiResult(null);

    try {
      const res = await axios.post(
        "/api/journal",
        {
          text: tempEntry.text,
          mood: tempEntry.mood,
          dateOnly: tempEntry.dateOnly,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEntries((prev) => [
        {
          ...res.data,
          id: res.data._id,
          date: new Date(res.data.createdAt).toLocaleString(),
          dateOnly: new Date(res.data.createdAt).toDateString(),
        },
        ...prev.filter((en) => en.id !== tempEntry.id),
      ]);
    } catch (err) {
      console.error("Error saving entry:", err);
    }
  };

  const handleDelete = async (entryId) => {
    if (!token) return;
    try {
      await axios.delete(`/api/journal/${entryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries((prev) => prev.filter((e) => e.id !== entryId));
    } catch (err) {
      console.error("Error deleting entry:", err);
    }
  };

  const handleAiAnalyze = async () => {
    if (!user) return setShowLoginAlert(true);
    if (!entry.trim()) {
      setErrorMessage("Please write something to analyze.");
      return;
    }

    setAiResult({ content: "Analyzing..." });

    try {
      const res = await axios.post(
        "/api/ai/analyze",
        { journalText: entry },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAiResult({
        content: res.data.aiMessage || "No response from AI",
      });
    } catch (err) {
      console.error("AI analysis failed:", err.response?.data || err.message);
      setAiResult({
        content: "AI analysis failed. Please try again later.",
      });
    }
  };

  const filteredEntries = selectedDate
    ? entries.filter((e) => e.dateOnly === selectedDate.toDateString())
    : entries;

  return (
    <main className="relative bg-[#F4EDE3] text-neutral-800 min-h-screen overflow-x-hidden">
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${PaperTexture})`,
          backgroundRepeat: "repeat",
          opacity: 0.06,
        }}
      />

      {/* Floating blobs */}
      <motion.img
        src={BlobClay}
        alt=""
        className="absolute -top-20 -left-32 w-96 opacity-25"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={BlobSage}
        alt=""
        className="absolute bottom-0 -right-40 w-[28rem] opacity-25"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Login Alert */}
      {showLoginAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-sm text-center shadow-xl">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">
              Please login to fully access the website
            </h2>
            <button
              onClick={() => navigate("/login")}
              className="bg-neutral-800 text-white py-2 px-5 rounded-full font-semibold hover:bg-neutral-700 transition"
            >
              Go to Login Page
            </button>
            <button
              onClick={() => setShowLoginAlert(false)}
              className="mt-3 text-gray-500 underline text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-16 relative z-10">
        <h1 className="font-serif text-5xl font-semibold text-neutral-900 mb-10 text-center">
          Your Journal
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="rounded-3xl border border-neutral-200 bg-white/70 backdrop-blur-lg p-8 shadow-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <textarea
                  className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-400 bg-white/90"
                  placeholder="Write your thoughts..."
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  rows={5}
                />

                {/* Info box below textarea */}
                

                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}

                <p className="text-neutral-800 font-semibold">How are you feeling?</p>
                <div className="flex gap-3 flex-wrap">
                  {moods.map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setMood(m === mood ? "" : m)} // toggle selection
                      className={`px-4 py-2 rounded-full border transition-all ${
                        mood === m
                          ? "bg-neutral-800 text-white border-neutral-800"
                          : "bg-white hover:bg-neutral-50 border-neutral-300"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className={`flex-1 py-3 rounded-full font-semibold transition ${
                      user
                        ? "bg-neutral-900 text-white hover:bg-neutral-800"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                  >
                    Save Entry
                  </button>
                  <button
                    type="button"
                    onClick={handleAiAnalyze}
                    className={`flex-1 py-3 rounded-full font-semibold transition ${
                      user
                        ? "bg-amber-600 text-white hover:bg-amber-500"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                  >
                    Analyse with AI
                  </button>
                </div>
                <div className="text-left">
  <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm shadow-sm mb-2">
    🔒 Your journal entries are securely stored and cannot be accessed by anyone else.
  </div>
</div>

              </form>
            </motion.div>

            {aiResult && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="bg-white/70 backdrop-blur-lg p-6 rounded-3xl shadow-sm border-l-4 border-neutral-400"
              >
                <p className="text-gray-800">{aiResult.content}</p>
              </motion.div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="rounded-3xl border border-neutral-200 bg-white/70 backdrop-blur-lg p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-neutral-900 mb-4 text-center">
                View Entries by Date
              </h3>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                className="rounded-lg border border-neutral-300"
              />
              {selectedDate && (
                <button
                  onClick={() => setSelectedDate(null)}
                  className="mt-3 w-full text-sm text-neutral-700 underline"
                >
                  Show All Entries
                </button>
              )}
            </motion.div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-neutral-900">Past Entries</h3>
              {filteredEntries.length === 0 && (
                <p className="text-neutral-700 text-sm">No entries found.</p>
              )}
              {filteredEntries.map((e) => (
                <motion.div
                  key={e.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="bg-white/70 backdrop-blur-lg p-4 rounded-2xl shadow-sm border-l-4 border-neutral-400 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl">{e.mood}</span>
                    <span className="text-sm italic text-gray-500">{e.date}</span>
                  </div>
                  <p className="text-gray-800">{e.text}</p>
                  {user && (
                    <button
                      onClick={() => handleDelete(e.id)}
                      className="text-red-500 text-sm mt-2 underline"
                    >
                      Delete
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JournalPage;