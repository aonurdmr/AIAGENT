import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from '@/components/Home';
import AIIdentify from '@/components/AIIdentify';
import MapView from '@/components/MapView';
import Community from '@/components/Community';
import ActivityLog from '@/components/ActivityLog';
import AIChat from '@/components/AIChat';
import Profile from '@/components/Profile';
import Navbar from '@/components/Navbar';
import '@/App.css';

function AppInner() {
  const location = useLocation();
  const hideNav = ['/ai-asistan'].includes(location.pathname);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tani" element={<AIIdentify />} />
        <Route path="/harita" element={<MapView />} />
        <Route path="/topluluk" element={<Community />} />
        <Route path="/aktivite" element={<ActivityLog />} />
        <Route path="/ai-asistan" element={<AIChat />} />
        <Route path="/profil" element={<Profile />} />
      </Routes>
      {!hideNav && <Navbar />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

export default App;
