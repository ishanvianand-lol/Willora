import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Login from './components/Login';
import JournalPage from './components/JournalPage';
import InsightsPage from './components/InsightsPage';
import CommunityPage from './components/CommunityPage';
import Profile from './components/Profile';
import ScrollProgress from "./components/ScrollProgress";
import ContactPage from "./components/ContactPage";
import PrivacyPage from "./components/PrivacyPage";
import AboutPage from "./components/AboutPage"
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
