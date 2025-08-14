import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

const themes = ["Earthy", "Rosy", "Dark", "Light"];

const defaultAvatar =
  "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_placeholder.png";

const Profile = () => {
  const { user, setUser, token } = useContext(AuthContext);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [theme, setTheme] = useState(user?.theme || "Earthy");
  const [message, setMessage] = useState("");
  const [moodData, setMoodData] = useState([]);

  // Fetch mood data safely
  useEffect(() => {
    const fetchMood = async () => {
      try {
        const res = await axios.get("/api/journal/moods", {
          headers: { Authorization: `Bearer ${token}` },
        });

        let data = res.data;
        if (!Array.isArray(data)) {
          data = Object.entries(data).map(([date, mood]) => ({ date, mood }));
        }

        setMoodData(data);
      } catch (err) {
        console.log("Error fetching mood data", err);
        setMoodData([]);
      }
    };

    if (token) fetchMood();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "/api/auth/update",
        { name, email, avatar, theme },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.user);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="relative w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
            alt="Profile Background"
            className="w-full h-full object-cover filter brightness-50"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 text-gray-100 flex flex-col gap-8">
          {/* Profile Header */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-emerald-400 mb-4">
              <img
                src={avatar || defaultAvatar}
                alt="User Avatar"
                className="w-24 h-24 object-contain"
              />
            </div>
            <h2 className="text-3xl font-semibold text-emerald-400 mb-1">
              {user?.name || "Your Name"}
            </h2>
            <p className="text-lg text-gray-200 mb-4">
              {user?.email || "email@example.com"}
            </p>
          </div>

          {/* Update Profile Form */}
          <form
            onSubmit={handleUpdate}
            className="flex flex-col gap-4 bg-white bg-opacity-30 rounded-xl p-6 text-gray-900"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Edit Profile</h3>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded-md border border-gray-300"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-md border border-gray-300"
              required
            />
            <input
              type="text"
              placeholder="Avatar URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="p-2 rounded-md border border-gray-300"
            />

            {/* Theme Picker */}
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="p-2 rounded-md border border-gray-300"
            >
              {themes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="px-6 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition"
            >
              Update Profile
            </button>
            {message && <p className="mt-2 text-sm text-yellow-200">{message}</p>}
          </form>

          {/* Account Details */}
          <div className="bg-white bg-opacity-30 rounded-xl p-6 text-gray-100">
            <h3 className="text-xl font-semibold mb-2 text-gray-200">Account Details</h3>
            <p>
              <span className="font-medium text-gray-100">Joined:</span>{" "}
              {user?.createdAt ? new Date(user.createdAt).toDateString() : "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-100">Mood Entries:</span>{" "}
              {user?.journalCount || 0}
            </p>
            <p>
              <span className="font-medium text-gray-100">Preferred Theme:</span> {theme}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
