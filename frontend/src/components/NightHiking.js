import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  prepare: {
    title: 'Hazirlik',
    items: [
      { icon: '🔦', t: 'Aydinlatma', d: '300+ lumen baslik lambasi zorunlu; yedek pil ve el feneri taşımak sigortaldir.' },
      { icon: '🗺️', t: 'Rota Bilgisi', d: 'Gece rota gunduz onceden gezilmeli; GPS veya harita daima yaninda olmali.' },
      { icon: '👥', t: 'Grup Gereksinimi', d: 'Gece yuruyusu icin minimum 3 kisi; yalniz gece yuruyusu ozelikle onerilmez.' },
      { icon: '🧥', t: 'Giyim', d: 'Gece sicakligi beklenenden daha dusuk olabilir; ekstra katman mutlaka alin.' },
      { icon: '📱', t: 'Iletisim', d: 'Dolu sarj, offline harita ve acil durum iletisim listesi hazir olmalidir.' },
    ],
  },
  experience: {
    title: 'Deneyim',
    items: [
      { icon: '🌟', t: 'Yildiz Gorunumu', d: 'Isik kirliligi olmayan daglik bölge geceleri Samanyolu bile gozle gorulur.' },
      { icon: '🦉', t: 'Gece Hayvanlari', d: 'Baykus, tilki, kirpi ve yarasa gece aktivite cozumunde gozlemlenebilir.' },
      { icon: '🌸', t: 'Gece Cicekleri', d: 'Bazi bitkiler gece actigi icin gunduz kacirilan guzellikler kesif olur.' },
      { icon: '🌙', t: 'Ay Isigi', d: 'Dolunay geceleri lambaya gerek kalmayacak kadar aydinlik ortam saglanabilir.' },
      { icon: '🧘', t: 'Meditasyon', d: 'Sessiz gece ormaninda yuruyus stresi azaltan derin bir deneyim sunar.' },
    ],
  },
};

export default function NightHiking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('prepare');
  const data = TABS[tab];
  const accent = '#4338ca';
  const bg = '#020008';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#e0e7ff', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌙 Gece Yürüyüşü</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#0c0818', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#818cf8',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#080618', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#a5b4fc', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
