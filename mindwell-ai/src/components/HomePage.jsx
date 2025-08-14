import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx"; // adjust path if needed
// import "font.css";

const Homepage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Assuming AuthContext provides user object

  const isLoggedIn = !!user;

  return (
    <div
      className="flex flex-col min-h-screen font-sans text-gray-800"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1633210155534-e43f00c1d627?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div class="root-hehe" className="flex flex-col min-h-screen bg-black bg-opacity-30">
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-20 md:py-32">
          <div className="md:w-1/2 space-y-6 text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold">
              {isLoggedIn
                ? `Welcome back, ${user?.name || "Friend"}`
                : "Welcome to Willora"}
            </h1>
            <p className="text-lg md:text-xl leading-relaxed">
              {isLoggedIn
                ? "Continue your journey towards mindfulness and self-awareness."
                : "Track your moods, journal your thoughts, and explore AI-powered insights for mental wellness."}
            </p>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="px-6 py-3 bg-[#7a6c57] text-white font-semibold rounded-lg hover:bg-[#635843] transition"
                  >
                    Go to Dashboard
                  </button>
                  <button
                    onClick={() => navigate("/profile")}
                    className="px-6 py-3 bg-[#c9a17a] text-white font-semibold rounded-lg hover:bg-[#b28e63] transition"
                  >
                    Profile
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/register")}
                    className="px-6 py-3 bg-[#7a6c57] text-white font-semibold rounded-lg hover:bg-[#635843] transition"
                  >
                    Get Started
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-3 bg-[#c9a17a] text-white font-semibold rounded-lg hover:bg-[#b28e63] transition"
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
            <img
              src="/public/willora.png"
              alt="Willora illustration"
              className="w-32 rounded-xl shadow-lg mix-blend-darken opacity-80"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 md:px-20 py-16 bg-black bg-opacity-20">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 bg-white bg-opacity-80 border rounded-lg hover:shadow-md transition text-center text-gray-800">
              <h3 className="text-xl font-semibold text-[#7a6c57] mb-2">
                Journal Your Thoughts
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                Record daily thoughts and reflections in a secure, private
                journal.
              </p>
            </div>
            <div className="p-6 bg-white bg-opacity-80 border rounded-lg hover:shadow-md transition text-center text-gray-800">
              <h3 className="text-xl font-semibold text-[#7a6c57] mb-2">
                Track Your Mood
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                Visualize patterns over time and understand your emotional
                triggers.
              </p>
            </div>
            <div className="p-6 bg-white bg-opacity-80 border rounded-lg hover:shadow-md transition text-center text-gray-800">
              <h3 className="text-xl font-semibold text-[#7a6c57] mb-2">
                AI Insights
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                Receive thoughtful suggestions and guidance powered by AI.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 text-center text-white border-t border-white/30">
          &copy; {new Date().getFullYear()} Willora. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
