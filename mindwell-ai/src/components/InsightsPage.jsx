import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

// Defined a simple Button component internally to resolve import issues
const Button = ({ onClick, children, variant, className = "" }) => {
  const baseClasses = "px-3 py-1.5 rounded-md font-semibold text-sm transition-colors duration-200"; // Button size remains consistent
  let specificClasses = "";

  switch (variant) {
    case "ghost":
      specificClasses = "bg-transparent border hover:bg-neutral-100";
      break;
    default:
      specificClasses = "bg-[#7a6c57] text-white hover:bg-[#635843]";
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${specificClasses} ${className}`}
    >
      {children}
    </button>
  );
};


const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

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
  {
    id: 7,
    title: "Calm Blog",
    description: "In-depth articles and guides on meditation, sleep, and managing stress.",
    url: "https://blog.calm.com/",
    imageUrl: "https://images.unsplash.com/photo-1483691278019-cb7253bee49f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 8,
    title: "Happify Daily",
    description: "Scientific activities and games to build skills for a happier, more resilient life.",
    url: "https://www.happify.com/daily/",
    imageUrl: "https://images.unsplash.com/photo-1590698933947-a202b069a861?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFwcHl8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 9,
    title: "Tiny Buddha",
    description: "Simple wisdom for complex lives. Stories and insights on happiness and personal growth.",
    url: "https://tinybuddha.com/",
    imageUrl: "https://images.unsplash.com/photo-1635792027852-1cc60ea132ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGlueSUyMGJ1ZGRoYXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 10,
    title: "The Anxiety and Depression Association of America (ADAA) Blog",
    description: "Credible information from experts on anxiety, depression, and related disorders.",
    url: "https://adaa.org/blog",
    imageUrl: "https://images.unsplash.com/photo-1563117435-6c087fdef111?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFueGlldHklMjBhbmQlMjBkZXByZXNzaW9uJTIwaGFwcHl8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 11,
    title: "GoodTherapy Blog",
    description: "A wide range of articles on mental health, relationships, and finding the right therapist.",
    url: "https://www.goodtherapy.org/blog",
    imageUrl: "https://images.unsplash.com/photo-1550504630-cc20eca3b23e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGhlcmFwaXN0fGVufDB8fHwwfHx8MA%3D%3D"
  },
  {
    id: 12,
    title: "Psych Central",
    description: "Extensive articles, quizzes, and resources on a wide range of mental health conditions.",
    url: "https://psychcentral.com/",
    imageUrl: "https://images.unsplash.com/photo-1725023841183-6a06ce2ce192?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBzeWNob2xvZ3l8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 13,
    title: "Mind Body Green",
    description: "A blog dedicated to wellness, focusing on mind, body, spirit, and emotional health.",
    url: "https://www.mindbodygreen.com/articles",
    imageUrl: "https://plus.unsplash.com/premium_photo-1678743317021-4b6110b27507?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1pbmR8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 14,
    title: "NAMI Blog",
    description: "Stories and insights from the National Alliance on Mental Illness on advocacy and support.",
    url: "https://www.nami.org/Blogs",
    imageUrl: "https://plus.unsplash.com/premium_photo-1711987208994-28aa5e73235c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVudGFsJTIwaWxsbmVzc3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 15,
    title: "The Mental Health Foundation Blog",
    description: "Expert opinions and personal stories on a variety of mental health topics.",
    url: "https://www.mentalhealth.org.uk/our-work/blog",
    imageUrl: "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1lbnRhbCUyMGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 16,
    title: "Therapist Aid Blog",
    description: "Practical advice, worksheets, and tools for self-improvement and emotional regulation.",
    url: "https://www.therapistaid.com/blog",
    imageUrl: "https://plus.unsplash.com/premium_photo-1663050739359-a4261779f6ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGhlcmFwaXN0fGVufDB8fDB8fHww"
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
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setCurrentQuote(motivationalQuotes[randomIndex]);
  }, []);

  return (
    <main className="relative bg-[#F4EDE3] text-neutral-800 overflow-x-hidden">
      {/* Paper texture overlay (using solid color for simplicity) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundColor: "#F4EDE3",
          opacity: 0.8,
        }}
      />

      {/* Floating blobs (removed imports as they caused issues, and keeping it simple) */}

      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10 pt-20 md:pt-24 pb-16 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-800">
              Mental Health Insights 🌿
            </h1>
          </motion.div>

          {/* Motivational Quote Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="w-full max-w-xl mt-8 mb-12 rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-3 font-serif text-[#7a6c57] text-center">
              Daily Motivation ✨
            </h2>
            <p className="text-base italic font-serif leading-relaxed text-neutral-700 text-center">
              "{currentQuote}"
            </p>
          </motion.div>

          {/* Main Content Area: Resources */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-2xl font-bold text-neutral-800 font-serif drop-shadow-lg mb-5 text-center"
          >
            Helpful Resources 📖
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 w-full">
            {originalResources.map((resource, i) => (
              <motion.div
                key={resource.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                // Changed card padding from p-5 to p-4, and font sizes within the card
                className={`bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden transition-all duration-300 transform hover:scale-[1.01] ${
                  i % 2 === 0 ? "md:translate-y-1" : "md:translate-y-2"
                }`}
              >
                <div className="aspect-[16/9] overflow-hidden group">
                  <img
                    src={resource.imageUrl}
                    alt={resource.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: "brightness(0.95) sepia(0.05) hue-rotate(-10deg)" }}
                  />
                </div>
                <div className="p-4"> {/* Reduced padding to p-4 */}
                  <h3 className="text-xl font-bold text-[#5c4a3f] mb-1 font-serif">{resource.title}</h3> {/* Adjusted title to text-xl */}
                  <p className="text-sm text-neutral-700 mb-3">{resource.description}</p> {/* Adjusted description to text-sm */}
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" className="border-neutral-400 text-neutral-800">
                      Read More
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="border-t border-neutral-200 relative z-10">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12 py-12 text-sm text-neutral-600">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p>&copy; {new Date().getFullYear()} Willora</p>
            <nav className="flex gap-6">
              <a href="/about" className="hover:opacity-80">About</a>
              <a href="/contact" className="hover:opacity-80">Contact</a>
              <a href="/privacy" className="hover:opacity-80">Privacy</a>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default InsightsPage;