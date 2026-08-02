import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  method: {
    title: 'Yontem',
    items: [
      { icon: '🦃', t: 'Sülün Avı', d: 'Ekim-Ocak av sezonu; av kopegi ile baskı ve bekleme teknikleri kullanilir.' },
      { icon: '🌾', t: 'Habitat Secimi', d: 'Tarla kenari, sulak cayir ve mese altliklari sulunun favori bolgesidir.' },
      { icon: '🐕', t: 'Av Kopegi', d: 'Braque, Setter ve Spaniel cinsleri sulun avinda en verimli kopeklerdir.' },
      { icon: '🌅', t: 'Sabah Avı', d: 'Sulun sabah erken saatlerde beslenmek icin aciga cikar; en iyi donem budur.' },
      { icon: '🔫', t: 'Silah Secimi', d: '12 ya da 20 kalibre çift dipçikli silah; No. 5 saçma standart secimdir.' },
    ],
  },
  cook: {
    title: 'Pisirme',
    items: [
      { icon: '🔥', t: 'Firin Sulun', d: 'Pastirma ve baharat ile sarilarak 180C firinda 90 dakika; klasik tarif.' },
      { icon: '🍲', t: 'Sulun Guveç', d: 'Sogan, havuc, mantar ve kirmizi sarap ile uzun pisirim; derin lezzet.' },
      { icon: '🥓', t: 'Bacon Sarma', d: 'Zayif etin kurumamasini onlemek icin pastirma ile sarip rosto etme.' },
      { icon: '🫙', t: 'Marine', d: 'Kirmizi sarap, biberiye ve defne yapraginda 24 saat bekletme yumusatir.' },
      { icon: '🍋', t: 'Servis', d: 'Kizaran sulun limon suyuyla tatlandirip pirenc pilav ile servis edin.' },
    ],
  },
};

export default function PheasantHunt() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('method');
  const data = TABS[tab];
  const accent = '#7c2d12';
  const bg = '#0a0000';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef2f2', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🦃 Sülün Avı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1c0000', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#ef4444',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#180000', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fca5a5', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
