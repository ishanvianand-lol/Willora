import React, { useState } from 'react';
import AIChatBox from './AIChatPage';

const JournalPage = () => {
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    if (!entry.trim()) return;

    // You can later connect this to your backend
    console.log('Saved entry:', { entry, mood, date: new Date() });

    setSuccess(true);
    setEntry('');
    setMood('');

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-emerald-50 px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-6 md:p-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">📝 Daily Journal</h2>
        
        <label className="block text-gray-600 text-sm mb-2">How are you feeling today?</label>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="mb-4 bg-white w-full border border-pink-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
            <option value="">Select mood</option>
            <option value="😊">😊 Happy</option>
            <option value="😔">😔 Sad</option>
            <option value="😠">😠 Angry</option>
            <option value="😌">😌 Calm</option>
            <option value="😰">😰 Anxious</option>
            <option value="😄">😄 Grateful</option>
            <option value="🤯">🤯 Overwhelmed</option>
            <option value="💪">💪 Motivated</option>
            <option value="😴">😴 Tired</option>
        </select>

        <label className="block text-gray-600 text-sm mb-2">Write your thoughts</label>
        <textarea
          rows="6"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className="w-full bg-white text-gray-800 border border-pink-200 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-300"
          placeholder="Type here..."
        />

        <button
          onClick={handleSave}
          className="bg-pink-400 text-white px-5 py-2 rounded-full text-sm hover:bg-pink-500 transition"
        >
          Save Entry
        </button>

        {success && (
          <div className="mt-4 text-green-600 text-sm">
            ✔️ Your journal entry has been saved!
          </div>
        )}
      </div>
    </div> 
  );
};

export default JournalPage;