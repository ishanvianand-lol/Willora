import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Trim inputs
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      const { user, token } = res.data;

      // Update context (reactive)
      login(user, token);

      // Redirect to homepage after a short delay
      setTimeout(() => navigate("/"), 500);
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
      <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-xl p-10 w-full max-w-md text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
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
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#7a6c57] rounded-lg font-semibold hover:bg-[#635843] transition mt-4 flex justify-center items-center"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-200">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#c9a17a] hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
