import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/Toast';

const API = process.env.REACT_APP_BACKEND_URL + '/api';

const DEFAULT_SETTINGS = {
  units: 'metric',
  default_activity: 'fishing',
  profile_public: true,
  notif_likes: true,
  notif_comments: true,
  notif_system: true,
};

function Toggle({ value, onChange, label, description }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '12px 0', borderBottom: '1px solid var(--border)',
    }}>
      <div>
        <div style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{label}</div>
        {description && <div style={{ fontSize: 11, color: 'var(--t-mute)', marginTop: 2 }}>{description}</div>}
      </div>
      <button
        onClick={() => onChange(!value)}
        style={{
          width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
          background: value ? '#22c55e' : 'var(--s3)',
          transition: 'background .2s', position: 'relative', flexShrink: 0,
        }}
      >
        <div style={{
          position: 'absolute', top: 3, left: value ? 23 : 3,
          width: 18, height: 18, borderRadius: '50%', background: '#fff',
          transition: 'left .2s', boxShadow: '0 1px 4px rgba(0,0,0,.3)',
        }} />
      </button>
    </div>
  );
}

function RadioGroup({ label, value, onChange, options }) {
  return (
    <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ fontSize: 13, color: '#fff', fontWeight: 600, marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', gap: 6 }}>
        {options.map(opt => (
          <button key={opt.value} onClick={() => onChange(opt.value)} style={{
            flex: 1, padding: '8px 6px', borderRadius: 10, cursor: 'pointer',
            background: value === opt.value ? 'var(--a-glow)' : 'var(--s3)',
            border: value === opt.value ? '1px solid var(--border-lg)' : '1px solid var(--border)',
            color: value === opt.value ? 'var(--a-light)' : 'var(--t-mute)',
            fontSize: 12, fontWeight: 600, transition: 'all .2s',
          }}>
            {opt.icon && <span style={{ marginRight: 4 }}>{opt.icon}</span>}
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Settings() {
  const { user, token, logout } = useAuth();
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [dirty, setDirty]       = useState(false);

  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const load = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    try {
      const { data } = await axios.get(`${API}/settings`, { headers: authHeader });
      setSettings({ ...DEFAULT_SETTINGS, ...data });
    } catch { }
    setLoading(false);
  }, [user, token]);

  useEffect(() => { load(); }, [load]);

  const set = (key, val) => {
    setSettings(p => ({ ...p, [key]: val }));
    setDirty(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      await axios.put(`${API}/settings`, settings, { headers: authHeader });
      toast('Ayarlar kaydedildi ✓');
      setDirty(false);
    } catch { toast('Kaydetme hatası', 'error'); }
    setSaving(false);
  };

  if (!user) {
    return (
      <div className="page fade-in">
        <div className="page-header"><h1>⚙️ Ayarlar</h1></div>
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--t-mute)' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚙️</div>
          <div>Ayarlara erişmek için giriş yapın</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1>⚙️ Ayarlar</h1>
            <p>Uygulama tercihlerini düzenle</p>
          </div>
          {dirty && (
            <button className="btn-primary" style={{ width: 'auto', padding: '8px 16px', fontSize: 13 }}
              onClick={save} disabled={saving}>
              {saving ? '…' : 'Kaydet'}
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <div className="spinner" />
        </div>
      ) : (
        <div style={{ padding: '12px 16px' }}>

          {/* Units */}
          <div className="card" style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 2 }}>
              📐 ÖLÇÜ BİRİMLERİ
            </div>
            <RadioGroup
              label=""
              value={settings.units}
              onChange={v => set('units', v)}
              options={[
                { value: 'metric',   label: 'Metrik',   icon: '🇹🇷' },
                { value: 'imperial', label: 'İmperial', icon: '🇺🇸' },
              ]}
            />
            <RadioGroup
              label="Varsayılan Aktivite"
              value={settings.default_activity}
              onChange={v => set('default_activity', v)}
              options={[
                { value: 'fishing',  label: 'Balıkçılık', icon: '🎣' },
                { value: 'hunting',  label: 'Avcılık',    icon: '🏹' },
                { value: 'camping',  label: 'Kamp',       icon: '⛺' },
              ]}
            />
          </div>

          {/* Privacy */}
          <div className="card" style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 2 }}>
              🔒 GİZLİLİK
            </div>
            <Toggle
              label="Profil Herkese Açık"
              description="Diğer kullanıcılar profilini görebilir"
              value={settings.profile_public}
              onChange={v => set('profile_public', v)}
            />
          </div>

          {/* Notifications */}
          <div className="card" style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 2 }}>
              🔔 BİLDİRİMLER
            </div>
            <Toggle
              label="Beğeni Bildirimleri"
              description="Paylaşımın beğenildiğinde bildir"
              value={settings.notif_likes}
              onChange={v => set('notif_likes', v)}
            />
            <Toggle
              label="Yorum Bildirimleri"
              description="Paylaşımına yorum yapıldığında bildir"
              value={settings.notif_comments}
              onChange={v => set('notif_comments', v)}
            />
            <Toggle
              label="Sistem Bildirimleri"
              description="Uygulama güncellemeleri ve duyurular"
              value={settings.notif_system}
              onChange={v => set('notif_system', v)}
            />
          </div>

          {/* Account */}
          <div className="card" style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t-mute)', letterSpacing: '.08em', marginBottom: 10 }}>
              👤 HESAP
            </div>
            <div style={{ fontSize: 13, color: 'var(--t-mid)', marginBottom: 4 }}>
              <strong style={{ color: '#fff' }}>@{user.username}</strong>
            </div>
            <div style={{ fontSize: 12, color: 'var(--t-mute)', marginBottom: 14 }}>{user.email}</div>
            <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', color: '#ef4444', borderColor: '#ef444430' }}
              onClick={logout}>
              🚪 Çıkış Yap
            </button>
          </div>

          {/* App info */}
          <div style={{ textAlign: 'center', padding: '8px 0 80px', color: 'var(--t-mute)' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>🎣</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--a-light)' }}>DoğaAI Platform</div>
            <div style={{ fontSize: 10, marginTop: 2 }}>v3.0 — Powered by NVIDIA NIM</div>
          </div>

        </div>
      )}
    </div>
  );
}
