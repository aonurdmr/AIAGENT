import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Türler',
    items: [
      { icon: '🐟', t: 'Torik', d: 'Thunnus thynnus; devasa Atlantik orkinos; Istanbul Bogazindan sonbahar gecisi.' },
      { icon: '🌊', t: 'Lüfer Göçü', d: 'Pomatomus saltatrix; ilkbahar ve sonbaharda Bogaz dan buyuk surüler gecer.' },
      { icon: '🎣', t: 'Kalkan Göçü', d: 'Psetta maxima; Karadeniz ile Marmara arasinda mevsimsel yerlerin degistirme.' },
      { icon: '🐠', t: 'Palamut', d: 'Sarda sarda; Eylül-Kasım arası Boğaz geçişi; amatör ve ticari balıkçılık.' },
      { icon: '⚡', t: 'Hamsi Göçü', d: 'Engraulis encrasicolus; Karadeniz yazlık, Marmara kışlık; muazzam sürüler.' },
    ],
  },
  season: {
    title: 'Sezon',
    items: [
      { icon: '🌸', t: 'İlkbahar Geçişi', d: 'Nisan-Mayıs; balıklar Marmara üzerinden Karadenize doğru beslenmeye gider.' },
      { icon: '🍂', t: 'Sonbahar Dönüşü', d: 'Eylül-Kasım; kışlamak için Marmara ve Ege ya inen balıklar Boğaz kullanır.' },
      { icon: '🌡️', t: 'Su Sıcaklığı', d: '18-22°C lüfer için ideal; sıcaklık düşünce sürüler derin sulara çekilir.' },
      { icon: '📡', t: 'Sonar Takibi', d: 'Kıyı balıkçıları ve araştırmacılar eko sonar ile sürü yoğunluğu ölçer.' },
      { icon: '📊', t: 'Kota Sistemi', d: 'Su Ürünleri Yönetimi ve BFAR kotaları her tür için ayrı belirleniyor.' },
    ],
  },
};

export default function MigratoryFish() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];
  const accent = '#0369a1';
  const bg = '#000810';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#e0f2fe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐟 Göçmen Balıklar</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001428', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#38bdf8',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001828', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#7dd3fc', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
