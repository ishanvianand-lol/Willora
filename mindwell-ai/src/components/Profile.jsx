import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { ResponsiveContainer, LineChart, Line } from "recharts";

/**
 * Playful Willora Profile Component
 */
const Profile = ({ userName = "Your Name", joinDate = new Date() }) => {
  // Example mood data (1-5 scale)
  const [moodData, setMoodData] = useState([]);
  const [randomMessage, setRandomMessage] = useState("");
  const [moodEmoji, setMoodEmoji] = useState("🙂");

  const progressMessages = [
    "Fantastic! You've taken another step towards your goals today.",
    "Celebrate your small achievements. Your progress is inspiring!",
    "Remember, every day is a new beginning. Be proud of your progress!",
    "Your consistency is your strength. Keep moving forward.",
    "This journey is yours. We're here to support you every step of the way.",
  ];

  const moodEmojis = ["😄", "😊", "😌", "🙂", "🤗"];

  // Generate random mood data for the last 7 days
  useEffect(() => {
    const data = Array.from({ length: 7 }, (_, i) => ({
      day: `Day ${i + 1}`,
      mood: Math.floor(Math.random() * 5) + 1,
    }));
    setMoodData(data);

    setRandomMessage(
      progressMessages[Math.floor(Math.random() * progressMessages.length)]
    );
    setMoodEmoji(moodEmojis[Math.floor(Math.random() * moodEmojis.length)]);
  }, []);

  const formattedDate = new Date(joinDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
         style={{ background: "linear-gradient(to bottom, #f6ecd9, #c9a17a)" }}>
      <div className="bg-white bg-opacity-80 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md lg:max-w-lg animate-fadeIn">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#a1866f] to-[#d1bfa7] flex items-center justify-center text-white text-5xl shadow-lg transition-transform hover:scale-105">
            <FaUserCircle />
            <span className="absolute -bottom-1 -right-1 text-2xl">{moodEmoji}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#7a6c57] mt-4 mb-1">
            {userName}
          </h1>
          <p className="text-sm sm:text-base text-[#5c4d3d]">
            Joined: {formattedDate}
          </p>
        </div>

        {/* Animated Progress */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#7a6c57] mb-4">
            Your Progress
          </h2>
          <div className="bg-[#ede3d8] border border-[#d6c6ad] rounded-lg p-4 sm:p-5 text-[#5c4d3d] leading-relaxed text-sm sm:text-base shadow-md animate-pulse">
            {randomMessage}
          </div>
          <p className="text-[#7a6c57] text-sm mt-4">We are with you every step of the way.</p>
        </div>

        {/* Mini Mood Chart */}
        <div className="mb-4">
          <h3 className="text-md font-medium text-[#7a6c57] mb-2 text-center">Last 7 Days Mood</h3>
          {moodData.length > 0 && (
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={moodData}>
                <Line type="monotone" dataKey="mood" stroke="#7a6c57" strokeWidth={3} dot={{ r: 4, fill: "#c9a17a" }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
