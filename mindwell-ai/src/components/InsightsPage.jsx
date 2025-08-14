import React, { useState, useEffect } from 'react';

// Original list of mental health resources
const originalResources = [
  {
    id: 1,
    title: "HelpGuide.org",
    description: "Navigate life’s challenges with trusted, evidence-based resources.",
    url: "https://www.helpguide.org/",
    imageUrl: "https://images.unsplash.com/photo-1604881991720-f91add269bed?q=80&w=687&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Verywell Mind",
    description: "Expert-backed articles on mental health topics, from therapy to self-care.",
    url: "https://www.verywellmind.com/",
    imageUrl: "https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Mindful.org",
    description: "Guided meditations and articles to help you live more mindfully.",
    url: "https://www.mindful.org/",
    imageUrl: "https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    title: "Psychology Today",
    description: "Find helpful articles, therapy advice, and tips for personal growth.",
    url: "https://www.psychologytoday.com/",
    imageUrl: "https://images.unsplash.com/photo-1522134239946-03d8c105a0ba?q=80&w=1170&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Headspace Blog",
    description: "Helpful tips on meditation, mindfulness, and a healthier mind.",
    url: "https://www.headspace.com/blog",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=799&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "The Mighty",
    description: "Real stories from people with mental health conditions. A great community.",
    url: "https://themighty.com/",
    imageUrl: "https://plus.unsplash.com/premium_photo-1672292536170-8de3ec091ced?q=80&w=1170&auto=format&fit=crop"
  },
];

const motivationalQuotes = [
  "Your mental health is a priority. Your happiness is an essential. Your self-care is a necessity.",
  "You are capable of handling whatever today brings.",
  "Small steps forward are still progress.",
  "Your feelings are valid.",
  "Be gentle with yourself. You're doing the best you can.",
  "You are enough.",
  "It's okay to not be okay.",
  "The sun will rise again tomorrow.",
  "Remember to breathe and be present.",
  "Growth is a slow and gentle process.",
];

const InsightsPage = () => {
  const [readingList, setReadingList] = useState([]);
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setCurrentQuote(motivationalQuotes[randomIndex]);
  }, []);

  // Function to add or remove an item from the reading list
  const toggleReadingList = (resource) => {
    setReadingList(prevList => {
      if (prevList.find(item => item.id === resource.id)) {
        return prevList.filter(item => item.id !== resource.id);
      } else {
        return [...prevList, resource];
      }
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-12 px-6"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1667731976090-e274235f8280?q=80&w=687&auto=format&fit=crop')",
      }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Main Heading */}
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-8 text-center">
          Mental Health Insights 🌿
        </h1>

        {/* Motivational Quote Section */}
        <div className="mb-12 bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-[#7a6c57] text-center">Daily Motivation ✨</h2>
          <p className="text-xl italic font-serif leading-relaxed text-[#5c4a3f] text-center">
            "{currentQuote}"
          </p>
        </div>

        {/* Main Content Area: Resources and Reading List */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side: Resource Cards */}
          <div className="lg:w-2/3">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-6 text-center lg:text-left">Helpful Resources 📖</h2>
            <div className="space-y-6">
              {originalResources.map(resource => (
                <div
                  key={resource.id}
                  className="flex items-center bg-white rounded-xl shadow-lg hover:shadow-2xl 
                             transition-shadow duration-300 transform hover:scale-[1.02]"
                >
                  <div className="flex-1 p-6">
                    <h3 className="text-2xl font-bold text-[#5c4a3f] mb-1">{resource.title}</h3>
                    <p className="text-sm text-[#7a6c57] mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between text-xs text-[#a0a0a0]">
                      <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-[#7a6c57] hover:underline">
                        Read More
                      </a>
                      <button
                        onClick={() => toggleReadingList(resource)}
                        className="text-[#a0a0a0] hover:text-[#5c4a3f] transition-colors"
                      >
                        {readingList.find(item => item.id === resource.id) ? '📌 Saved' : '🔖 Save'}
                      </button>
                    </div>
                  </div>
                  <div className="w-1/3 h-40">
                    <img
                      src={resource.imageUrl}
                      alt={resource.title}
                      className="w-full h-full object-cover rounded-r-xl"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Your Reading List Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-[#5c4a3f] border-b pb-2 mb-4">Your Reading List</h2>
              {readingList.length > 0 ? (
                <ul className="space-y-4">
                  {readingList.map(item => (
                    <li key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-[#5c4a3f]">{item.title}</p>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#a0a0a0] hover:underline">
                          Visit Site
                        </a>
                      </div>
                      <button onClick={() => toggleReadingList(item)} className="text-red-500 hover:text-red-700 transition-colors">
                        <span className="text-lg">❌</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#a0a0a0] italic">Your reading list is empty.</p>
              )}
              {readingList.length > 0 && (
                <div className="text-right mt-4 text-[#7a6c57] hover:underline">
                  See all ({readingList.length})
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;