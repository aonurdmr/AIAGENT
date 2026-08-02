import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  biology: {
    title: 'Biyoloji',
    items: [
      { icon: '🐿️', t: 'Sincap Turleri', d: 'Sciurus vulgaris (Avrasya sincabi) Turkiye ormanlarinda yaygin yerli turdul.' },
      { icon: '🌰', t: 'Beslenmesi', d: 'Meyveler, tohumlar, mantarlar ve kabuklusalar yil boyu tuketir.' },
      { icon: '🏠', t: 'Yuvalama', d: 'Aga kovukları ya da dal catal noktalarina yaprak yuvasi (drey) insaa eder.' },
      { icon: '❄️', t: 'Kis Hazirlik', d: 'Sincaplar gercek k hibernasyon yapmaz; yiyecek depolar ve sik dinlenir.' },
      { icon: '👁️', t: 'Guz Isareti', d: 'Yuvarlak parlak gozler, sivri kulaklar ve kalın tubule kuyruk basa ozelliktir.' },
    ],
  },
  observe: {
    title: 'Gozlem',
    items: [
      { icon: '🌲', t: 'Habitat', d: 'Karisik ve yaprakdoken ormanlar, parklar ve bahceler aktif yasam alanlari.' },
      { icon: '📅', t: 'Sezon', d: 'Ilkbahar ve yaz en aktif donem; kis aylarinda aktivite belirgin azalir.' },
      { icon: '🌰', t: 'Cekim Tuzagi', d: 'Fistik, findik ve kuru misir ile gozlem istasyonu kurabilirsiniz.' },
      { icon: '📸', t: 'Fotograf Taktikleri', d: 'Isik oynayan yaprak araliginda makro lensle dogal davranis kare sikme.' },
      { icon: '🤫', t: 'Sessizlik Kurali', d: 'Sincaplar ani sesler ve hareketlerden hemen kactigindan sabir sereklidir.' },
    ],
  },
};

export default function SquirrelWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('biology');
  const data = TABS[tab];
  const accent = '#b45309';
  const bg = '#080400';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef3c7', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐿️ Sincap Gözlemi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1c0e00', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#d97706',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#160c00', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fbbf24', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
