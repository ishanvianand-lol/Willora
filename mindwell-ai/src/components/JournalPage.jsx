import React, { useState } from "react";

const moods = ["😊", "😔", "😡", "😱", "😴", "❤️"];

const JournalPage = () => {
  const [entry, setEntry] = useState("");
  const [mood, setMood] = useState("");
  const [entries, setEntries] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!entry || !mood) return;

    const newEntry = {
      id: Date.now(),
      text: entry,
      mood,
      date: new Date().toLocaleString(),
    };

    setEntries([newEntry, ...entries]);
    setEntry("");
    setMood("");
  };

  return (
    <div className="min-h-screen bg-[#f0ede5] m-50 font-sans">
      <h1 className="text-3xl md:text-4xl font-bold text-[#7a6c57] mb-6 text-center">
        Your Journal
      </h1>

      {/* New Entry */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mb-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a17a]"
            placeholder="Write your thoughts..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            rows={5}
          />

          <div className="flex gap-3 flex-wrap">
            {moods.map((m) => (
              <button
                type="button"
                key={m}
                onClick={() => setMood(m)}
                className={`px-4 py-2 rounded-lg border ${
                  mood === m ? "bg-[#c9a17a] text-white" : "bg-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-[#7a6c57] text-white py-3 rounded-lg font-semibold hover:bg-[#635843] transition"
          >
            Save Entry
          </button>
        </form>
      </div>

      {/* Past Entries */}
      <div className="max-w-xl mx-auto space-y-6">
        {entries.length === 0 && (
          <p className="text-center text-gray-600">No entries yet.</p>
        )}
        {entries.map((e) => (
          <div
            key={e.id}
            className="bg-white p-4 rounded-xl shadow-md border-l-4 border-[#c9a17a]"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xl">{e.mood}</span>
              <span className="text-sm text-gray-500">{e.date}</span>
            </div>
            <p className="text-gray-800">{e.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
