import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // use context

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Trim inputs
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword || !trimmedConfirm) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    if (trimmedPassword !== trimmedConfirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      });

      const { token, user } = res.data;

      // Update context (reactive)
      login(user, token);

      setTimeout(() => navigate("/login"), 500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen font-sans"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1694861786917-b53dd8a86ea6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-xl p-10 w-full max-w-md text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7a6c57]"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7a6c57]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7a6c57]"
              placeholder="********"
            />
          </div>
          <div>
            <label className="block mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7a6c57]"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#7a6c57] rounded-lg font-semibold hover:bg-[#635843] transition mt-4 flex justify-center items-center"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-200">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#c9a17a] hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;