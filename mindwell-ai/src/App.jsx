import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import HomePage from '../src/components/HomePage';
import Register from '../src/components/Register';
import Login from '../src/components/Login';
import JournalPage from '../src/components/JournalPage';
import AIChatPage from '../src/components/AIChatPage';

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

export default App;