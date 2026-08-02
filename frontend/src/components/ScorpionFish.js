import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  fishing: {
    title: 'Avcılık',
    items: [
      { icon: '🐠', t: 'İskorpit', d: 'Scorpaena porcus ve S. scrofa; kayalik diplerde saklanan dikkatli av baligi.' },
      { icon: '⚠️', t: 'Dikene Dikkat', d: 'Sirt yuzgeci dikenleri zehirli; yakalama sirasinda eline batmayin.' },
      { icon: '🎣', t: 'Avlanma', d: 'Dip oltasi ve uzun takim; yavas cekme ve cok az hareket iskorpiti aldatir.' },
      { icon: '🌊', t: 'Lokasyon', d: 'Kayalik ve taşlık dip yapılari; 2-30 m derinlikte; maki ve kamuflaj ustası.' },
      { icon: '🔦', t: 'Gece Avı', d: 'Gece kayalıklarda zıpkınla avlanma da mümkün; tüplü dalış deneyimi şart.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🍲', t: 'Balık Çorbası', d: 'İskorpit çorbası Akdeniz lezzeti; kemik suyu zengin, lezzet yoğun.' },
      { icon: '🔥', t: 'Fırın', d: 'Zeytinyağı, sarımsak, kapari ve limonla 180°C de 25 dakika pişirme.' },
      { icon: '🫙', t: 'Marine', d: 'Portakal ve defne yaprağıyla marine; Catalonia tarzı İspanyol sunum.' },
      { icon: '🍋', t: 'Izgara', d: 'Tüm balık ızgarası, kelebek açımı; yüksek ateşte kısa süre; limon yanında.' },
      { icon: '🫕', t: 'Güveç', d: 'Domates, soğan, zeytinyağı ile güveçte; Ege adaları usulü balık yahnisi.' },
    ],
  },
};

export default function ScorpionFish() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('fishing');
  const data = TABS[tab];
  const accent = '#c2410c';
  const bg = '#0c0200';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fff7ed', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐠 İskorpit Rehberi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1c0600', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#fb923c',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#180600', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fdba74', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
