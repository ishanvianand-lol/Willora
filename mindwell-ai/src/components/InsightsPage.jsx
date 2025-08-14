import React, { useState, useEffect } from 'react';

// Motivational quotes ka array
const quotes = [
  "Your mental health is a priority. Your happiness is an essential. Your self-care is a necessity.",
  "You are capable of handling whatever today brings.",
  "Small steps forward are still progress.",
  "Your feelings are valid.",
  "Be gentle with yourself. You're doing the best you can."
];

// External mental health resources ka updated array, with helpguide.org
const externalResources = [
  { title: "HelpGuide.org", description: "Navigate life’s challenges with trusted, evidence-based resources.", url: "https://www.helpguide.org/" },
  { title: "Verywell Mind", description: "Expert-backed articles on mental health topics, from therapy to self-care.", url: "https://www.verywellmind.com/" },
  { title: "Mindful.org", description: "Guided meditations and articles to help you live more mindfully.", url: "https://www.mindful.org/" },
  { title: "Psychology Today", description: "Find helpful articles, therapy advice, and tips for personal growth.", url: "https://www.psychologytoday.com/" },
  { title: "Headspace Blog", description: "Helpful tips on meditation, mindfulness, and a healthier mind.", url: "https://www.headspace.com/blog" },
  { title: "The Mighty", description: "Real stories from people with mental health conditions. A great community.", url: "https://themighty.com/" },
  { title: "NAMI Blog", description: "The official blog of the National Alliance on Mental Illness.", url: "https://nami.org/Blogs" },
  { title: "Healthline Mental Health", description: "Detailed articles and guides on a wide range of mental health issues.", url: "https://www.healthline.com/health/mental-health" },
  { title: "GoodTherapy Blog", description: "A blog dedicated to professional mental health and wellness advice.", url: "https://www.goodtherapy.org/blog/" },
  { title: "Talkspace Blog", description: "Articles on therapy, relationships, and emotional well-being.", url: "https://www.talkspace.com/blog/" }
];

const InsightsPage = () => {
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center pt-20 px-6 md:px-12"
      style={{
        backgroundImage:
            "url('https://images.unsplash.com/photo-1667731976090-e274235f8280?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
    >
      <div className="max-w-4xl mx-auto text-[#5c4a3f]">
        <h1 className="text-4xl font-extrabold text-center mb-12 drop-shadow-md text-[#f9f5f0]">
          Mental Health Insights 🌿
        </h1>

        {/* Daily Quote Section */}
        <div className="mb-12 bg-white/70 backdrop-blur-md border border-[#c9a17a] rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-[#7a6c57]">Daily Motivation ✨</h2>
          <p className="text-xl italic font-serif leading-relaxed text-[#5c4a3f] text-center">
            "{currentQuote}"
          </p>
        </div>

        {/* External Resources Section */}
        <div className="bg-white/70 backdrop-blur-md border border-[#c9a17a] rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-[#7a6c57]">Helpful Resources 📖</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {externalResources.map((resource, index) => (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className="block bg-white/60 backdrop-blur-sm border border-[#d1b38a] rounded-lg p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <h3 className="text-lg font-semibold mb-2 text-[#7a6c57]">{resource.title}</h3>
                <p className="text-sm text-[#5c4a3f]">{resource.description}</p>
                <span className="text-xs text-[#7a6c57] mt-2 block">{resource.url}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;

