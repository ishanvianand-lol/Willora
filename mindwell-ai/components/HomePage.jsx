import React from 'react';

const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="bg-emerald-50 text-gray-800 px-6 py-16 md:py-24 font-sans">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Left Content */}
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            Prioritize Your Mental Well-being
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
            MindwellAI offers you a space to reflect, journal, and discover patterns in your emotional world — gently and privately.
          </p>
          <button
            onClick={() => setCurrentPage('features')}
            className="px-5 py-2.5 bg-pink-400 hover:bg-pink-500 text-white rounded-full text-sm font-medium transition"
          >
            Explore Features
          </button>
        </div>

        {/* Right Content */}
        <div className="md:w-1/2">
          <div className="bg-pink-100 border border-pink-100 p-6 rounded-md shadow-sm text-sm text-gray-700 leading-relaxed">
            “Caring for your mind is just as important as caring for your body.”<br />
            <span className="block mt-4 text-gray-500 text-xs">— MindwellAI</span>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="mt-20 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-700">
        <div className="border-l-4 border-pink-400 bg-pink-50 p-4 rounded-sm">
          <h3 className="font-semibold mb-1">📝 Journal Freely</h3>
          <p>Your thoughts deserve a safe place. Start by expressing how you feel.</p>
        </div>
        <div className="border-l-4 border-pink-400 bg-pink-50 p-4 rounded-sm">
          <h3 className="font-semibold mb-1">📊 Track Patterns</h3>
          <p>Gain insights into your moods and emotional rhythms over time.</p>
        </div>
        <div className="border-l-4 border-pink-400 bg-pink-50 p-4 rounded-sm">
          <h3 className="font-semibold mb-1">💬 Connect Privately</h3>
          <p>Reach out through AI assistance, helplines, or anonymous support.</p>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-16 text-center text-sm text-gray-400">
        You’re not alone. MindwellAI is here for every step of your emotional journey.
      </div>
    </div>
  );
};

export default HomePage;
