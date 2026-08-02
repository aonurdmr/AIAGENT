import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const TYPE_META = {
  like:    { icon: '❤️', color: '#ef4444' },
  comment: { icon: '💬', color: '#3b82f6' },
  system:  { icon: '📢', color: '#22c55e' },
};

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return 'az önce';
  if (diff < 3600) return `${Math.floor(diff / 60)}dk önce`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}sa önce`;
  return `${Math.floor(diff / 86400)}g önce`;
}

export default function Notifications() {
  const { user, token } = useAuth();
  const [notifs, setNotifs] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);

  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const load = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    try {
      const { data } = await axios.get(`${API}/notifications`, { headers: authHeader });
      setNotifs(data.notifications || []);
      setUnread(data.unread || 0);
    } catch { }
    setLoading(false);
  }, [user, token]);

  useEffect(() => { load(); }, [load]);

  const markAllRead = async () => {
    if (!unread) return;
    await axios.put(`${API}/notifications/read`, {}, { headers: authHeader });
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
    setUnread(0);
  };

  const markRead = async (id) => {
    await axios.put(`${API}/notifications/${id}/read`, {}, { headers: authHeader });
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    setUnread(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1>🔔 Bildirimler</h1>
            <p>{unread > 0 ? `${unread} okunmamış bildirim` : 'Tüm bildirimler okundu'}</p>
          </div>
          {unread > 0 && (
            <button className="btn-ghost" style={{ fontSize: 12, padding: '6px 12px' }}
              onClick={markAllRead}>
              Tümünü Oku ✓
            </button>
          )}
        </div>
      </div>

      <div style={{ padding: '12px 16px' }}>
        {!user ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--t-mute)' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔔</div>
            <div style={{ fontSize: 14, marginBottom: 4 }}>Bildirimleri görmek için giriş yapın</div>
          </div>
        ) : loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
            <div className="spinner" />
          </div>
        ) : notifs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--t-mute)' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔕</div>
            <div style={{ fontSize: 14, marginBottom: 4 }}>Henüz bildirim yok</div>
            <div style={{ fontSize: 12 }}>Paylaşım yaptığında veya beğenildiğinde burada görünecek</div>
          </div>
        ) : (
          notifs.map(n => {
            const meta = TYPE_META[n.type] || TYPE_META.system;
            return (
              <div
                key={n.id}
                onClick={() => !n.read && markRead(n.id)}
                style={{
                  background: n.read ? 'var(--s2)' : 'rgba(34,197,94,.06)',
                  border: `1px solid ${n.read ? 'var(--border)' : 'rgba(34,197,94,.18)'}`,
                  borderRadius: 14, padding: '12px 14px', marginBottom: 8,
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  cursor: n.read ? 'default' : 'pointer',
                  transition: 'all .2s',
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                  background: meta.color + '18',
                  border: `1px solid ${meta.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }}>
                  {meta.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: n.read ? 'var(--t-mid)' : '#fff', lineHeight: 1.4 }}>
                    {n.message}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--t-mute)', marginTop: 4 }}>
                    {timeAgo(n.created_at)}
                  </div>
                </div>
                {!n.read && (
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: '#22c55e', flexShrink: 0, marginTop: 4,
                    boxShadow: '0 0 6px #22c55e',
                  }} />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
