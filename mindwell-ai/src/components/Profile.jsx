import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext.jsx";
import axios from "axios";

const themes = ["Earthy", "Rosy", "Dark", "Light"];

const Profile = () => {
  const { user, setUser, token } = useContext(AuthContext);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [dob, setDob] = useState(user?.dob || "");
  const [theme, setTheme] = useState(user?.theme || "Earthy");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setDob(user?.dob || "");
    setTheme(user?.theme || "Earthy");
  }, [user]);

  useEffect(() => {
    const fetchMood = async () => {
      if (!token) return;
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
        console.error("Error fetching mood data", err);
      }
    };
    fetchMood();
  }, [token]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!token) {
      setMessage("Update failed: No authentication token found.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("dob", dob);
      formData.append("theme", theme);
      if (selectedFile) formData.append("avatar", selectedFile);

      const res = await axios.put("/api/auth/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      setMessage("Profile updated successfully! 🎉");
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message || "Update failed due to server error. 😔");
      } else if (err.request) {
        setMessage("Update failed: No response from server. 🌐");
      } else {
        setMessage("Update failed: Unexpected error 😔");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getThemeColors = (currentTheme) => {
    switch (currentTheme) {
      case "Earthy":
        return {
          bg: "bg-stone-100",
          text: "text-stone-800",
          accent: "bg-yellow-700",
          accentText: "text-white",
          border: "border-stone-300",
          inputBg: "bg-white",
        };
      case "Rosy":
        return {
          bg: "bg-rose-50",
          text: "text-rose-800",
          accent: "bg-rose-500",
          accentText: "text-white",
          border: "border-rose-300",
          inputBg: "bg-white",
        };
      case "Dark":
        return {
          bg: "bg-gray-800",
          text: "text-gray-100",
          accent: "bg-teal-500",
          accentText: "text-white",
          border: "border-gray-700",
          inputBg: "bg-gray-700",
        };
      case "Light":
        return {
          bg: "bg-white",
          text: "text-gray-800",
          accent: "bg-blue-500",
          accentText: "text-white",
          border: "border-gray-200",
          inputBg: "bg-gray-100",
        };
      default:
        return {
          bg: "bg-stone-100",
          text: "text-stone-800",
          accent: "bg-yellow-700",
          accentText: "text-white",
          border: "border-stone-300",
          inputBg: "bg-white",
        };
    }
  };

  const colors = getThemeColors(theme);

  return (
    <div className={`min-h-screen ${colors.bg} p-6 flex items-center justify-center`}>
      <div className={`w-full max-w-lg ${colors.bg} rounded-3xl shadow-xl p-8 transform transition-transform duration-300 hover:scale-[1.01]`}>
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 rounded-full border-4 border-dashed border-gray-400 p-2 mb-4 group cursor-pointer">
            <img
              src={selectedFile ? URL.createObjectURL(selectedFile) : (user?.avatar || "https://picsum.photos/200")}
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full transition-opacity duration-300"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-900 bg-opacity-50 cursor-pointer"
            >
              <span className="text-white text-2xl font-bold">✎</span>
              <input
                id="avatar-upload"
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
          <h2 className={`text-4xl font-bold ${colors.text} text-center`}>{name || "Your Name"}</h2>
          <p className={`text-sm ${colors.text} opacity-70`}>{email || "email@example.com"}</p>
        </div>

        {/* Profile Update Form */}
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label htmlFor="name" className={`block text-sm font-medium mb-1 ${colors.text}`}>Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl ${colors.inputBg} ${colors.text} ${colors.border} border outline-none focus:border-yellow-700 transition-colors duration-200`}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-1 ${colors.text}`}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl ${colors.inputBg} ${colors.text} ${colors.border} border outline-none focus:border-yellow-700 transition-colors duration-200`}
              required
            />
          </div>
          <div>
            <label htmlFor="dob" className={`block text-sm font-medium mb-1 ${colors.text}`}>Date of Birth</label>
            <input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl ${colors.inputBg} ${colors.text} ${colors.border} border outline-none focus:border-yellow-700 transition-colors duration-200`}
            />
          </div>
          <div>
            <label htmlFor="theme" className={`block text-sm font-medium mb-1 ${colors.text}`}>Theme</label>
            <select
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl ${colors.inputBg} ${colors.text} ${colors.border} border outline-none focus:border-yellow-700 transition-colors duration-200 appearance-none`}
            >
              {themes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-lg ${colors.accent} ${colors.accentText} hover:opacity-80 transition-opacity duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
          {message && <p className={`mt-4 text-center text-sm ${colors.text}`}>{message}</p>}
        </form>

        {/* Account Details */}
        <div className={`mt-8 pt-6 ${colors.border} border-t-2 border-dashed`}>
          <h3 className={`text-xl font-bold ${colors.text} mb-4`}>Account Details</h3>
          <div className="space-y-2">
            <p className={`${colors.text} text-sm flex items-center gap-2`}>
              <span className="font-medium">Joined:</span>{" "}
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN") : "N/A"}
            </p>
            <p className={`${colors.text} text-sm flex items-center gap-2`}>
              <span className="font-medium">Mood Entries:</span> {user?.journalCount || 0}
            </p>
            <p className={`${colors.text} text-sm flex items-center gap-2`}>
              <span className="font-medium">Preferred Theme:</span> {theme}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
