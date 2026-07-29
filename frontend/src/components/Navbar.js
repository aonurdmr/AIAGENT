import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TABS = [
  { path: '/',         icon: '🏠', label: 'Ana Sayfa' },
  { path: '/tani',     icon: '🔍', label: 'AI Tanı' },
  { path: '/ajanlar',  icon: '🤖', label: 'Ajanlar' },
  { path: '/harita',   icon: '🗺️', label: 'Harita' },
  { path: '/profil',   icon: '👤', label: 'Profil' },
];

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();

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
              }}
            >
              <span style={{
                fontSize: 21,
                lineHeight: 1,
                filter: active ? 'drop-shadow(0 0 6px rgba(34,197,94,.55))' : 'none',
                transition: 'filter .2s',
              }}>
                {tab.icon}
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
