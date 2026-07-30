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
import SpeciesDB    from '@/components/SpeciesDB';
import NLPTools     from '@/components/NLPTools';
import ImageGen     from '@/components/ImageGen';
import Equipment    from '@/components/Equipment';
import Leaderboard  from '@/components/Leaderboard';
import Search       from '@/components/Search';
import WeatherDetail from '@/components/WeatherDetail';
import Analytics      from '@/components/Analytics';
import Notifications  from '@/components/Notifications';
import Achievements      from '@/components/Achievements';
import SeasonalCalendar from '@/components/SeasonalCalendar';
import Notes           from '@/components/Notes';
import Settings         from '@/components/Settings';
import Recommendations  from '@/components/Recommendations';
import Checklist       from '@/components/Checklist';
import TripReport      from '@/components/TripReport';
import TrophyCabinet   from '@/components/TrophyCabinet';
import FishCalc        from '@/components/FishCalc';
import BaitGuide       from '@/components/BaitGuide';
import MoonCalendar    from '@/components/MoonCalendar';
import KnotGuide       from '@/components/KnotGuide';
import { ToastProvider } from '@/components/Toast';
import '@/App.css';

const HIDE_NAV = ['/ai-asistan', '/giris', '/ajanlar'];

function AppInner() {
  const location = useLocation();
  const hideNav  = HIDE_NAV.some(p => location.pathname.startsWith(p));

  return (
    <div className="app-container">
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/tani"        element={<AIIdentify />} />
        <Route path="/harita"      element={<MapView />} />
        <Route path="/topluluk"    element={<Community />} />
        <Route path="/aktivite"    element={<ActivityLog />} />
        <Route path="/ai-asistan"  element={<AIChat />} />
        <Route path="/profil"      element={<Profile />} />
        <Route path="/giris"       element={<Login />} />
        <Route path="/ajanlar"     element={<AgentCenter />} />
        <Route path="/planlama"    element={<Planner />} />
        <Route path="/turler"      element={<SpeciesDB />} />
        <Route path="/nlp"         element={<NLPTools />} />
        <Route path="/gorsel"      element={<ImageGen />} />
        <Route path="/ekipman"     element={<Equipment />} />
        <Route path="/liderboard"  element={<Leaderboard />} />
        <Route path="/arama"       element={<Search />} />
        <Route path="/hava"        element={<WeatherDetail />} />
        <Route path="/analiz"      element={<Analytics />} />
        <Route path="/bildirimler" element={<Notifications />} />
        <Route path="/basarilar"   element={<Achievements />} />
        <Route path="/takvim"      element={<SeasonalCalendar />} />
        <Route path="/notlar"      element={<Notes />} />
        <Route path="/ayarlar"     element={<Settings />} />
        <Route path="/oneri"       element={<Recommendations />} />
        <Route path="/kontrol"     element={<Checklist />} />
        <Route path="/rapor"       element={<TripReport />} />
        <Route path="/kupalar"     element={<TrophyCabinet />} />
        <Route path="/hesap"       element={<FishCalc />} />
        <Route path="/yem"         element={<BaitGuide />} />
        <Route path="/ay"          element={<MoonCalendar />} />
        <Route path="/dugum"       element={<KnotGuide />} />
      </Routes>
      {!hideNav && <Navbar />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <AppInner />
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}
