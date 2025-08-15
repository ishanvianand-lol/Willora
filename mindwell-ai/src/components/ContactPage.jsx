import React from 'react';
import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare, MapPin, Send, MessageCircleMore, Handshake } from 'lucide-react'; // Added MessageCircleMore, Handshake
import { useNavigate } from "react-router-dom";

// Import assets from your components/assets folder
import BlobClay from "../components/assets/blob-clay.svg";
import BlobSage from "../components/assets/blob-sage.svg";
import PaperTexture from "../components/assets/beige-paper.png";

// Animation variant consistent with HomePage
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ContactPage() {
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
            <MessageCircleMore size={48} className="text-neutral-500 mr-4" /> {/* Updated icon */}
            <h1 className="font-serif text-5xl lg:text-6xl font-semibold">Let's Connect & Collaborate!</h1> {/* More engaging title */}
          </div>
          <p className="max-w-2xl text-lg mb-8">
            Your voice is valuable to us. Whether you're a user, a potential partner, or just curious, reach out! We're here to listen, assist, and grow together.
          </p>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mt-12">
            {/* Email Card */}
            <div className="bg-white rounded-3xl p-8 shadow-md border border-neutral-200 text-center hover:shadow-lg transition-shadow duration-300">
              <Mail size={40} className="text-blue-500 mb-4 mx-auto" />
              <h2 className="font-semibold text-2xl mb-2">General Inquiries</h2>
              <p className="text-neutral-700 mb-4">
                Have questions about Willora? Our team is ready to provide quick and helpful responses.
              </p>
              <a href="mailto:support@willora.com" className="text-blue-600 hover:underline font-medium inline-flex items-center">
                Email Support <span className="ml-1 text-xs">→</span>
              </a>
            </div>

            {/* Support & Feedback Card */}
            <div className="bg-white rounded-3xl p-8 shadow-md border border-neutral-200 text-center hover:shadow-lg transition-shadow duration-300">
              <Phone size={40} className="text-green-500 mb-4 mx-auto" /> {/* Changed icon to phone for support feel */}
              <h2 className="font-semibold text-2xl mb-2">Support & Feedback</h2>
              <p className="text-neutral-700 mb-4">
                Experiencing an issue or have a brilliant idea? Let us know how we can make Willora even better for you.
              </p>
              <button
                onClick={() => alert("This would lead to a dedicated support/feedback form!")} // Simulated action
                className="text-green-600 hover:underline font-medium inline-flex items-center"
              >
                Get Help Now <span className="ml-1 text-xs">→</span>
              </button>
            </div>

            {/* Partnerships Card */}
            <div className="bg-white rounded-3xl p-8 shadow-md border border-neutral-200 text-center hover:shadow-lg transition-shadow duration-300">
              <Handshake size={40} className="text-amber-600 mb-4 mx-auto" /> {/* Partnership icon */}
              <h2 className="font-semibold text-2xl mb-2">Partnerships</h2>
              <p className="text-neutral-700 mb-4">
                Interested in collaborating with Willora? We're open to exciting new ventures.
              </p>
              <a href="mailto:partnerships@willora.com" className="text-amber-600 hover:underline font-medium inline-flex items-center">
                Propose a Partnership <span className="ml-1 text-xs">→</span>
              </a>
            </div>
          </div>

          {/* New: Simulated Contact Form Section */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-16 bg-white rounded-3xl p-10 md:p-14 shadow-xl border border-neutral-200">
            <h3 className="font-serif text-3xl mb-6 text-center">Send Us a Quick Message!</h3>
            <form className="max-w-xl mx-auto space-y-6">
              <div>
                <label htmlFor="name" className="block text-neutral-700 text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-neutral-700 text-sm font-medium mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-neutral-700 text-sm font-medium mb-2">Your Message</label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 resize-y"
                  placeholder="Tell us what's on your mind..."
                ></textarea>
              </div>
              <button
                type="submit"
                onClick={(e) => { e.preventDefault(); alert("Thanks for your message! We'll get back to you soon. (This is a simulated submission)"); }}
                className="w-full bg-neutral-800 text-white font-medium py-3 px-6 rounded-full shadow-lg hover:bg-neutral-700 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                Send Message <Send size={20} />
              </button>
            </form>
          </motion.div>

          {/* Closing Remark */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-16 text-center text-neutral-700 text-lg">
            <p className="font-serif text-2xl mb-4">We value your connection with Willora.</p>
            <p>
              Your insights and questions help us continually refine our journey to provide you with the best journaling experience. We look forward to hearing from you!
            </p>
          </motion.div>

        </motion.div>
      </section>
    </main>
  );
}