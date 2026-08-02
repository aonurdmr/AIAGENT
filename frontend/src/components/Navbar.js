import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const TABS = [
  { path: '/',             icon: '🏠', label: 'Ana Sayfa' },
  { path: '/arama',        icon: '🔍', label: 'Arama' },
  { path: '/ajanlar',      icon: '🤖', label: 'Ajanlar' },
  { path: '/bildirimler',  icon: '🔔', label: 'Bildirim', notif: true },
  { path: '/profil',       icon: '👤', label: 'Profil' },
];

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, token } = useAuth();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (!user || !token) { setUnread(0); return; }
    const fetch = () => {
      axios.get(`${API}/notifications`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => setUnread(r.data.unread || 0))
        .catch(() => {});
    };
    fetch();
    const iv = setInterval(fetch, 30000);
    return () => clearInterval(iv);
  }, [user, token]);

  useEffect(() => {
    if (location.pathname === '/bildirimler') setUnread(0);
  }, [location.pathname]);

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: 430,
      zIndex: 100,
      padding: '0 12px 20px',
      background: 'linear-gradient(180deg, transparent 0%, rgba(4,13,4,.95) 30%)',
      backdropFilter: 'blur(0px)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        background: 'rgba(13,31,13,.92)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(34,197,94,.15)',
        borderRadius: 26,
        padding: '5px 6px',
        boxShadow: '0 -1px 0 rgba(34,197,94,.08), 0 8px 32px rgba(0,0,0,.6)',
      }}>
        {TABS.map(tab => {
          const active = location.pathname === tab.path;
          const badge = tab.notif && unread > 0;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                padding: '7px 14px',
                borderRadius: 20,
                border: 'none',
                cursor: 'pointer',
                background: active
                  ? 'linear-gradient(135deg, rgba(34,197,94,.18), rgba(22,163,74,.1))'
                  : 'transparent',
                transition: 'all .2s cubic-bezier(.34,1.2,.64,1)',
                transform: active ? 'scale(1.05)' : 'scale(1)',
                minWidth: 56,
                position: 'relative',
              }}
            >
              <span style={{
                fontSize: 21,
                lineHeight: 1,
                filter: active ? 'drop-shadow(0 0 6px rgba(34,197,94,.55))' : 'none',
                transition: 'filter .2s',
                position: 'relative',
              }}>
                {tab.icon}
                {badge && (
                  <span style={{
                    position: 'absolute', top: -3, right: -4,
                    background: '#ef4444', color: '#fff',
                    borderRadius: '50%', fontSize: 8, fontWeight: 800,
                    width: 14, height: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1.5px solid rgba(13,31,13,.92)',
                    lineHeight: 1,
                  }}>
                    {unread > 9 ? '9+' : unread}
                  </span>
                )}
              </span>
              <span style={{
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: '.04em',
                color: active ? '#86efac' : 'rgba(74,122,74,.8)',
                transition: 'color .2s',
              }}>
                {tab.label}
              </span>
              {active && (
                <div style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 6px #22c55e',
                  marginTop: 1,
                  animation: 'fadeIn .2s ease both',
                }} />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
