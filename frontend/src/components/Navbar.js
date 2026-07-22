import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const tabs = [
  { path: '/',         icon: '🏠', label: 'Ana Sayfa' },
  { path: '/tani',     icon: '🔍', label: 'AI Tanı' },
  { path: '/harita',   icon: '🗺️', label: 'Harita' },
  { path: '/topluluk', icon: '👥', label: 'Topluluk' },
  { path: '/profil',   icon: '👤', label: 'Profil' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 430,
      background: 'linear-gradient(180deg, #0a1a0a00 0%, #0a1a0a 20%)',
      padding: '8px 0 16px',
      zIndex: 100,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-around',
        background: '#122212',
        border: '1px solid #22c55e22',
        borderRadius: 24,
        margin: '0 12px',
        padding: '6px 4px',
        boxShadow: '0 -4px 24px #000a',
      }}>
        {tabs.map(tab => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 2, padding: '6px 12px', borderRadius: 16,
                border: 'none', cursor: 'pointer',
                background: active ? '#22c55e22' : 'transparent',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 20, lineHeight: 1 }}>{tab.icon}</span>
              <span style={{
                fontSize: 10, fontWeight: 600,
                color: active ? '#22c55e' : '#4a6741',
                transition: 'color 0.2s',
              }}>{tab.label}</span>
              {active && (
                <div style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: '#22c55e', marginTop: 1,
                }} />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
