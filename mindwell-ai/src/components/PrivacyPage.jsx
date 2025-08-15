import React from 'react';
import { motion } from "framer-motion";
import { Lock, ShieldCheck, FileText, UserCog, Cloud, EyeOff, KeyRound } from 'lucide-react'; // Added Cloud, EyeOff, KeyRound for more diverse icons
import { useNavigate } from "react-router-dom"; // Import useNavigate for potential CTAs

// Import assets from your components/assets folder
import BlobClay from "../components/assets/blob-clay.svg";
import BlobSage from "../components/assets/blob-sage.svg";
import PaperTexture from "../components/assets/beige-paper.png";

// Animation variant consistent with HomePage
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function PrivacyPage() {
  const navigate = useNavigate();

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
            <Lock size={48} className="text-neutral-500 mr-4" />
            <h1 className="font-serif text-5xl lg:text-6xl font-semibold">Your Thoughts, Truly Private.</h1> {/* Stronger, more direct title */}
          </div>
          <p className="max-w-2xl text-lg mb-8">
            At Willora, we understand the sacred space your journal holds. That's why your privacy isn't just a policy; it's the very foundation of our trust. **Your deepest thoughts remain yours and yours alone.**
          </p>

          {/* New "How We Protect You" Section */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-16 bg-white rounded-3xl p-10 md:p-14 shadow-xl border border-neutral-200">
            <div className="flex items-center justify-center mb-6">
              <ShieldCheck size={40} className="text-emerald-600 mr-3" />
              <h3 className="font-serif text-3xl text-center">How We Guard Your Journal</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Card 1: Encryption */}
              <div className="flex items-start space-x-4">
                <KeyRound size={32} className="text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-xl mb-1">End-to-End Security</h4>
                  <p className="text-neutral-700">
                    Every word you write is protected with **advanced encryption**. Your entries are scrambled before they leave your device and remain secure on our servers.
                  </p>
                </div>
              </div>
              {/* Card 2: No Sharing */}
              <div className="flex items-start space-x-4">
                <EyeOff size={32} className="text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-xl mb-1">Zero Third-Party Sharing</h4>
                  <p className="text-neutral-700">
                    Your personal journal content is **never, ever shared or sold** to advertisers, researchers, or any third party. Your data stays with you.
                  </p>
                </div>
              </div>
              {/* Card 3: Data Ownership */}
              <div className="flex items-start space-x-4">
                <UserCog size={32} className="text-indigo-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-xl mb-1">Complete Data Control</h4>
                  <p className="text-neutral-700">
                    You have the power. Easily **export your entire journal** data or permanently delete your account and all associated entries whenever you choose.
                  </p>
                </div>
              </div>
              {/* Card 4: Cloud Security */}
              <div className="flex items-start space-x-4">
                <Cloud size={32} className="text-purple-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-xl mb-1">Secure Cloud Storage</h4>
                  <p className="text-neutral-700">
                    Your journals are stored on secure cloud infrastructure, benefiting from robust physical and digital security measures.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Final Call to Action / Transparency */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-16 bg-gradient-to-br from-[#F0F2EB] to-[#E0E2DA] rounded-3xl p-10 shadow-xl border border-neutral-300 text-neutral-800 text-center">
            <h3 className="font-serif text-3xl mb-4">Ready for True Peace of Mind?</h3>
            <p className="text-xl leading-relaxed mb-6">
              Dive into self-discovery with Willora, knowing that your personal space is fortified and respected. Experience the freedom of unburdened journaling.
            </p>
            <a
              href="#" // You might link to a more detailed /privacy-full page here
              className="inline-flex items-center px-6 py-3 bg-neutral-800 text-white font-medium rounded-full shadow-lg hover:bg-neutral-700 transition-colors duration-300"
              onClick={() => alert("This would link to the full, detailed Privacy Policy document.")}
            >
              Read Our Full Privacy Policy <FileText size={20} className="ml-2" />
            </a>
          </motion.div>

        </motion.div>
      </section>
    </main>
  );
}