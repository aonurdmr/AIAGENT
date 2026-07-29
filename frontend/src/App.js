import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import Home         from '@/components/Home';
import AIIdentify   from '@/components/AIIdentify';
import MapView      from '@/components/MapView';
import Community    from '@/components/Community';
import ActivityLog  from '@/components/ActivityLog';
import AIChat       from '@/components/AIChat';
import Profile      from '@/components/Profile';
import Login        from '@/components/Login';
import Navbar       from '@/components/Navbar';
import AgentCenter  from '@/components/AgentCenter';
import Planner      from '@/components/Planner';
import '@/App.css';

const HIDE_NAV = ['/ai-asistan', '/giris', '/ajanlar'];

function AppInner() {
  const location = useLocation();
  const hideNav  = HIDE_NAV.some(p => location.pathname.startsWith(p));

  return (
    <div className="app-container">
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/tani"      element={<AIIdentify />} />
        <Route path="/harita"    element={<MapView />} />
        <Route path="/topluluk"  element={<Community />} />
        <Route path="/aktivite"  element={<ActivityLog />} />
        <Route path="/ai-asistan" element={<AIChat />} />
        <Route path="/profil"    element={<Profile />} />
        <Route path="/giris"     element={<Login />} />
        <Route path="/ajanlar"   element={<AgentCenter />} />
        <Route path="/planlama"  element={<Planner />} />
      </Routes>
      {!hideNav && <Navbar />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppInner />
      </Router>
    </AuthProvider>
  );
}
