import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import AuthContext from "../context/AuthContext.jsx";
import Button from "../components/ui/Button.jsx";

import BlobClay from "../components/assets/blob-clay.svg";
import BlobSage from "../components/assets/blob-sage.svg";
import PaperTexture from "../components/assets/beige-paper.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ProfilePage() {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({ name: "", email: "" });
  const [stats, setStats] = useState({ totalEntries: 0, streak: 0, averageMood: 0, communityPosts: 0 });
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!user || !token) {
    navigate("/login");
    return;
  }

  const fetchProfileStats = async () => {
    try {
      // Call the new stats endpoint that returns name, email, and all stats
      const res = await axios.get("/api/journals/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Populate profile data
      setProfileData({ name: res.data.name, email: res.data.email });

      // Populate stats
      setStats({
        totalEntries: res.data.totalEntries,
        streak: res.data.streak,
        averageMood: res.data.averageMood,
        communityPosts: res.data.communityPosts,
      });

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  fetchProfileStats();
}, [user, token, navigate]);


  if (loading) return <p className="text-center mt-20">Loading...</p>;

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
          <h1 className="font-serif text-5xl lg:text-6xl font-semibold mb-6">
            Welcome, {profileData.name}!
          </h1>
          <p className="max-w-2xl text-lg mb-8">
            Here’s a snapshot of your journaling journey and community activity.
          </p>

          {/* Profile Info Card */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-3xl p-8 shadow-md border border-neutral-200">
              <h2 className="font-semibold text-2xl mb-4">Your Info</h2>
              <p><strong>Name:</strong> {profileData.name}</p>
              <p><strong>Email:</strong> {profileData.email}</p>
              <div className="mt-6 flex gap-3">
                <Button variant="ghost" onClick={logout}>Logout</Button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-3xl p-8 shadow-md border border-neutral-200">
              <h2 className="font-semibold text-2xl mb-4">Your Stats</h2>
              <p><strong>Total Entries:</strong> {stats.totalEntries}</p>
              <p><strong>Current Streak:</strong> {stats.streak} days</p>
              <p><strong>Average Mood:</strong> {stats.averageMood}</p>
              <p><strong>Community Posts:</strong> {stats.communityPosts}</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-3xl p-10 shadow-md border border-neutral-200 relative overflow-hidden">
            <h3 className="font-serif text-3xl mb-4">Keep journaling daily!</h3>
            <p className="mb-6">One small entry at a time builds a meaningful habit.</p>
            <div className="flex gap-3">
              <Button onClick={() => navigate("/journal")}>New Journal Entry</Button>
              <Button variant="ghost" onClick={() => navigate("/community")}>Visit Community</Button>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}