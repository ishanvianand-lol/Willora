import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const moods = ["😊", "😔", "😡", "😱", "😴", "❤"];

const JournalPage = () => {
  const [entry, setEntry] = useState("");
  const [mood, setMood] = useState("");
  const [entries, setEntries] = useState([]);
  const [aiResult, setAiResult] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!entry || !mood) return;

    const newEntry = {
      id: Date.now(),
      text: entry,
      mood,
      date: new Date().toLocaleString(),
      dateOnly: new Date().toDateString(), // for filtering
    };

    setEntries([newEntry, ...entries]);
    setEntry("");
    setMood("");
    setAiResult(null);
  };

  const handleAiAnalyze = () => {
    if (!entry) return alert("Please write something to analyze.");
    setAiResult({
      mood: "Calm & Reflective 😌",
      suggestions: [
        "Take a short walk to clear your mind.",
        "Write down 3 things you’re grateful for today.",
        "Listen to calming instrumental music."
      ]
    });
  };

  const filteredEntries = selectedDate
    ? entries.filter((e) => e.dateOnly === selectedDate.toDateString())
    : entries;

  return (
    <div className="min-h-screen bg-[#f0ede5] p-6 pt-20 font-sans">
      <h1 className="text-4xl font-bold text-[#7a6c57] mb-8 text-center">
        Your Journal
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: New Entry + AI */}
        <div className="lg:col-span-2 space-y-6">
          {/* New Entry */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a17a] bg-[#fdfbf7]"
                placeholder="Write your thoughts..."
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                rows={5}
              />

              {/* Mood Selector */}
              <div className="flex gap-3 flex-wrap">
                {moods.map((m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setMood(m)}
                    className={`px-4 py-2 rounded-full border transition-all ${
                      mood === m
                        ? "bg-[#c9a17a] text-white border-[#c9a17a]"
                        : "bg-white hover:bg-[#f3f0eb] border-gray-300"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#7a6c57] text-white py-3 rounded-lg font-semibold hover:bg-[#635843] transition"
                >
                  Save Entry
                </button>
                <button
                  type="button"
                  onClick={handleAiAnalyze}
                  className="flex-1 bg-[#c9a17a] text-white py-3 rounded-lg font-semibold hover:bg-[#b38a65] transition"
                >
                  Analyse with AI
                </button>
              </div>
            </form>
          </div>

          {/* AI Analysis Result */}
          {aiResult && (
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#c9a17a] animate-fadeIn">
              <h2 className="text-xl font-semibold text-[#7a6c57] mb-2">
                AI Mood Analysis
              </h2>
              <p className="mb-4">
                <strong>Mood:</strong> {aiResult.mood}
              </p>
              <h3 className="font-semibold mb-1">Suggestions:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {aiResult.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Calendar + Past Entries */}
        <div className="space-y-6">
          {/* Calendar */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-[#7a6c57] mb-4 text-center">
              View Entries by Date
            </h3>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="rounded-lg border border-gray-300"
            />
            {selectedDate && (
              <button
                onClick={() => setSelectedDate(null)}
                className="mt-3 w-full text-sm text-blue-600 underline"
              >
                Show All Entries
              </button>
            )}
          </div>

          {/* Past Entries */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#7a6c57]">Past Entries</h3>
            {filteredEntries.length === 0 && (
              <p className="text-gray-600 text-sm">No entries found.</p>
            )}
            {filteredEntries.map((e) => (
              <div
                key={e.id}
                className="bg-white p-4 rounded-xl shadow-md border-l-4 border-[#c9a17a] hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl">{e.mood}</span>
                  <span className="text-sm italic text-gray-500">{e.date}</span>
                </div>
                <p className="text-gray-800">{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalPage;