import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  catch: {
    title: 'Avcilik',
    items: [
      { icon: '🐟', t: 'Hamsi Turu', d: 'Engraulis encrasicolus; Karadeniz\'in simgesi, Ekim-Subat arasi en lezzetli donem.' },
      { icon: '🌊', t: 'Av Yontemi', d: 'Gırgır agıyla surun avciligi; sahil olta avinda ise kalamar yemi kullanilir.' },
      { icon: '📅', t: 'Sezon', d: 'Kasim-Ocak hamsinin en yogun oldugu donem; deniz suyu 12C altindayken tatli.' },
      { icon: '📍', t: 'Bolgeler', d: 'Dogu Karadeniz hamsi potansiyeli acısından Turkiye\'nin en verimli bolgesidir.' },
      { icon: '⚡', t: 'Hizli Hazirlik', d: 'Hamsi aynı gun temizlenip pisirilmeli; buz cıkarmasi hizli bozulmayi onler.' },
    ],
  },
  cook: {
    title: 'Pisirme',
    items: [
      { icon: '🌽', t: 'Misir Unu Hamsi', d: 'Misir ununa bulanan hamsiyi sıvıyagda kizartin; 2-3 dakika her iki yan.' },
      { icon: '🫙', t: 'Hamsi Pilav', d: 'Hamsi + pirinç + tereyagi + baharatla klasik karadeniz pilav yapılır.' },
      { icon: '🥙', t: 'Hamsi Tava', d: 'Bütün hamsiler tava dipte dizili zeytinyagi ve limon ile katman katman pisir.' },
      { icon: '🌊', t: 'Tuzlama', d: 'Balikci tuzuyla 3-6 ay tuzlanan hamsi güçlü umami tadi olan Kolios olur.' },
      { icon: '🍋', t: 'Limon Ile Servis', d: 'Kizarmis hamsi limon ve roka salatasi ile servis edilmesi Karadeniz usul.' },
    ],
  },
};

export default function AnchovyCooking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('catch');
  const data = TABS[tab];
  const accent = '#0e7490';
  const bg = '#000c10';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#cffafe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐟 Hamsi Rehberi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001820', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#22d3ee',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001c24', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#67e8f9', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
