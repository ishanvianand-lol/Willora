import React from 'react';
import { motion } from "framer-motion";
import { Sparkles, Leaf, BookOpen, ChevronRight } from 'lucide-react'; // Added BookOpen and ChevronRight icons
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Import assets from your components/assets folder
import BlobClay from "../components/assets/blob-clay.svg";
import BlobSage from "../components/assets/blob-sage.svg";
import PaperTexture from "../components/assets/beige-paper.png";

// Animation variant consistent with HomePage
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutPage() {
  const navigate = useNavigate(); // Initialize navigate hook

  return (
    <main className="relative bg-[#F4EDE3] text-neutral-800 overflow-x-hidden min-h-screen">
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
        className="absolute -top-32 -left-32 w-96 opacity-30"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={BlobSage}
        alt=""
        className="absolute top-1/2 -right-40 w-[28rem] opacity-30"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <section className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-12 py-28">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className="flex items-center mb-6">
            <Leaf size={48} className="text-neutral-500 mr-4" /> {/* Added icon */}
            <h1 className="font-serif text-5xl lg:text-6xl font-semibold">About Willora</h1> {/* Changed title slightly */}
          </div>
          <p className="max-w-2xl text-lg mb-8">
            Willora is more than just a journaling app; it's a sanctuary for your thoughts and a catalyst for personal growth. We've meticulously designed a space where daily reflection feels natural, empowering you to cultivate mindfulness and emotional well-being.
          </p>
          <p className="max-w-2xl text-lg mt-4">
            Our commitment is to provide intuitive tools that foster consistency, allow you to observe subtle mood patterns over time, and above all, ensure your insights remain entirely private and secure. Join us in building a habit that truly transforms.
          </p>

          <div className="mt-12 p-8 bg-white rounded-3xl shadow-md border border-neutral-200 flex items-start space-x-4">
            <Sparkles size={32} className="text-amber-500 flex-shrink-0" />
            <div>
              <h3 className="font-serif text-2xl font-semibold mb-2">Our Philosophy: Nurturing Your Inner World</h3>
              <p className="text-neutral-700">
                We believe that true insight comes from consistent, gentle reflection, not rigid analysis. Willora aims to be your quiet companion on this journey, helping you connect with yourself one thought at a time, fostering a deeper understanding of your emotions and experiences.
              </p>
            </div>
          </div>

          {/* New section for an interesting fact/CTA */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-16 bg-gradient-to-br from-[#EAE0D5] to-[#D8C7A5] rounded-3xl p-10 shadow-xl border border-neutral-300 text-neutral-800">
            <div className="flex items-center mb-4">
              <BookOpen size={40} className="text-neutral-700 mr-4" />
              <h3 className="font-serif text-3xl">Did You Know?</h3>
            </div>
            <p className="text-xl leading-relaxed mb-6">
              Regular journaling can boost creativity, reduce stress, and improve problem-solving skills. With Willora, thousands of moments are captured daily, leading to healthier, happier lives.
            </p>
            <button
              onClick={() => navigate("/journal")}
              className="inline-flex items-center px-6 py-3 bg-neutral-800 text-white font-medium rounded-full shadow-lg hover:bg-neutral-700 transition-colors duration-300"
            >
              Start Your First Entry <ChevronRight size={20} className="ml-2" />
            </button>
          </motion.div>

        </motion.div>
      </section>
    </main>
  );
}