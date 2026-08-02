import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  harvest: {
    title: 'Hasat',
    items: [
      { icon: '🍋', t: 'Yabani Ayva', d: 'Cydonia oblonga; Orta Anadolu un yabani ayva kayisi; kultive atasi.' },
      { icon: '📅', t: 'Hasat Donemi', d: 'Ekim-Kasim; sari renk donumu ve koku yayilinca hasat zamani gelir.' },
      { icon: '🌳', t: 'Agac Tanima', d: 'Kucuk yaprakli, calisma egimli agac; beyaz cicekler ilkbaharda; koku sacer.' },
      { icon: '🧺', t: 'Toplama', d: 'Elle toplanir; düşen meyveler cürük olabilir; dallardaki tercih edilir.' },
      { icon: '🌍', t: 'Lokasyon', d: 'Orta Anadolu platosu, Tokatliyan vadisi ve Karadeniz etekleri yabani alan.' },
    ],
  },
  use: {
    title: 'Kullanım',
    items: [
      { icon: '🍯', t: 'Ayva Reçeli', d: 'En lezzetli meyve reçeli; taze ayva portakal rengine dönüşür; pektin zengini.' },
      { icon: '🫙', t: 'Ayva Marmelatı', d: 'Donmuş jöle kıvamında membrillo; Avrupa kahvaltı klasiği Türk yorumu.' },
      { icon: '🍵', t: 'Ayva Çayı', d: 'Dilimlenmiş ayva, karanfil ve tarçınla demleme; kış güzelliği.' },
      { icon: '🥩', t: 'Et Yanı', d: 'Kuzu eti ve kuru meyveyle pişirme; Osmanlı saray mutfağı geleneği.' },
      { icon: '💊', t: 'Pektin', d: 'Yüksek pektin içeriği kolesterol düşürücü; geleneksel Türk halk tıbbında.' },
    ],
  },
};

export default function WildQuince() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('harvest');
  const data = TABS[tab];
  const accent = '#ca8a04';
  const bg = '#080600';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fefce8', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🍋 Yabani Ayva</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#161000', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#fbbf24',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#120e00', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fde68a', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
