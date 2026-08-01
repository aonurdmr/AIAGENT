import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  calls: {
    title: 'Çağrı Türleri',
    items: [
      { icon: '📣', t: 'Bugle cagri', d: 'Klasik geyik sesi: yuksek frekansta inis. Ruttta erkek birbirini cagırır.' },
      { icon: '🎺', t: 'Grunt', d: 'Derin, kısa ses: erkek agirligini belirtir. Rakibe meydan okuma.' },
      { icon: '🔊', t: 'Cow call', d: 'Disi geyik sesi: erkegi ceker. Rut donemi en etkili teknik.' },
      { icon: '🌿', t: 'Uyari cagri', d: 'Ani alarm: tum geyikler dondurur. Kullanma: sahayı sifirlar.' },
    ],
  },
  timing: {
    title: 'Zamanlama',
    items: [
      { icon: '🗓️', t: 'Rut mevsimi', d: 'Eylul-Ekim: geyik ciftlesme mevsimi. Cagri en etkili bu donemde.' },
      { icon: '🌅', t: 'Sabah saati', d: 'Gunes dogusu: geyikler beslemeye cıkar. Avci pozisyon al.' },
      { icon: '🌙', t: 'Aksam cagri', d: 'Gunden aksama: geyik tekrar aktif. Ikinci en verimli zaman.' },
      { icon: '⏱️', t: 'Tempo', d: 'Cagri sonrası sessizlik: 10-15 dakika bekle. Ani cagri kacırtır.' },
    ],
  },
};

export default function ElkCalling() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('calls');
  const data = TABS[tab];

  return (
    <div style={{ background: '#060802', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦌 Geyik Çağrısı Teknikleri</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Çağrı türleri · zamanlama · teknikler</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f59e0b' : '#0c1004', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0c1004', borderRadius: 14, padding: 14, border: '1px solid #f59e0b33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #161c08' : 'none' }}>
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
