import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext.jsx";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [moodTrend, setMoodTrend] = useState([]);
  const [stats, setStats] = useState({});
  const [communityPosts, setCommunityPosts] = useState([]);
  const [tip, setTip] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const token = localStorage.getItem("token");

    fetch("/api/dashboard/mood-trend", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setMoodTrend(data));

    fetch("/api/dashboard/stats", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setStats(data));

    fetch("/api/dashboard/community", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setCommunityPosts(data));

    fetch("/api/dashboard/tip", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setTip(data.tip));
  }, [user, navigate]);

  if (!user) return null;

  return (
    <main className="relative bg-[#F4EDE3] text-neutral-800 min-h-screen px-6 md:px-10 lg:px-12 py-10">
      <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl mb-6">Hello, {user.name.split(" ")[0]}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Mood Trends */}
        <motion.div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm" initial="hidden" animate="visible" variants={fadeUp}>
          <h2 className="font-medium mb-4">Mood Trends</h2>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={moodTrend}>
              <XAxis dataKey="day" />
              <YAxis domain={[1, 10]} />
              <Tooltip />
              <Line type="monotone" dataKey="mood" stroke="#6B7280" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Journal Summary */}
        <motion.div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }}>
          <h2 className="font-medium mb-4">Journal Summary</h2>
          <p>Total Entries: {stats.totalEntries || 0}</p>
          <p>Current Streak: {stats.streak || 0} days</p>
        </motion.div>

        {/* Community Highlights */}
        <motion.div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}>
          <h2 className="font-medium mb-4">Community Highlights</h2>
          {communityPosts.map(p => <p key={p._id} className="text-sm mb-2">• {p.title}</p>)}
        </motion.div>

        {/* Daily Tip */}
        <motion.div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.3 }}>
          <h2 className="font-medium mb-4">Daily Tip</h2>
          <p>{tip || "Stay mindful and write a little every day!"}</p>
        </motion.div>
      </div>
    </main>
  );
}
