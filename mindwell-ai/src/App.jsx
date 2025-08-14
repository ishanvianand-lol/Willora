import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from '../src/components/Navbar';
import HomePage from '../src/components/HomePage';
import Register from '../src/components/Register';
import Login from '../src/components/Login';
import JournalPage from '../src/components/JournalPage';
import InsightsPage from '../src/components/InsightsPage';
import CommunityPage from '../src/components/CommunityPage';
import Profile from '../src/components/Profile';
import Dashboard from "../src/components/Dashboard";
import AIChatPage from '../src/components/AIChatPage';
import ScrollProgress from "../src/components/ScrollProgress";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <ScrollProgress color="#7a6c57" height="4px" /> {/* earthy green */}
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/chat" element={<AIChatPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
