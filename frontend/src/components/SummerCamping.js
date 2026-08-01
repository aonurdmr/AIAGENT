import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  tips: {
    title: 'İpuçları',
    items: [
      { icon: '☀️', t: 'Gune donememe', d: 'Cadir doguya don: sabah gunes ile uyan. Bati: gunes batar, aksam serin.' },
      { icon: '🌬️', t: 'Havalandırma', d: 'Cadir icini serinlet: her iki kapı ac, ruzgar yonune ayarla.' },
      { icon: '💧', t: 'Sogukluk', d: 'Islak mendil veya buz tuplu termos. Boyun ve bilege uygula.' },
      { icon: '🦟', t: 'Bocekler', d: 'Sivrisinek en aktif aksam. Ruzgar varsa azalır. Amber ısık kullan.' },
    ],
  },
  gear: {
    title: 'Yaz Ekipmanı',
    items: [
      { icon: '🛏️', t: 'Yaz uyku tulumu', d: 'Yaz için +15 veya mesh tulum. Yüksek dereceli tulum bocacaktır.' },
      { icon: '⛺', t: 'Cadir', d: '3 mevsim cadir: mesh ile havalanma saglar. Su gecirmezligi yeterli.' },
      { icon: '🧴', t: 'Güneş kremi', d: 'Açık alan: SPF50+. Her 2 saatte bir yenile. Dudak ve kulak unutma.' },
      { icon: '🧢', t: 'Şapka', d: 'Genis kenarlı şapka gölge yaratır. Kep sadece ons korur.' },
    ],
  },
};

export default function SummerCamping() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('tips');
  const data = TABS[tab];

  return (
    <div style={{ background: '#080400', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>☀️ Yaz Kampı Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>İpuçları · sıcak hava · ekipman</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f59e0b' : '#140a00', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#140a00', borderRadius: 14, padding: 14, border: '1px solid #f59e0b33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #1e1200' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24' }}>{item.t}</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
