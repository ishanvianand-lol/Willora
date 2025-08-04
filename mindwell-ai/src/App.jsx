import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HomePage from '../components/HomePage';
import Register from '../components/Register';
import Login from '../components/Login';
import JournalPage from '../components/JournalPage';
import AIChatPage from '../components/AIChatPage';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/chat" element={<AIChatPage />} />
      </Routes>
    </div>
  );
};

export default App;
