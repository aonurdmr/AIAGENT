import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  method: {
    title: 'Yöntem',
    items: [
      { icon: '🎣', t: 'Istavrit Avcılığı', d: 'Trachurus trachurus; Türkiye kıyılarında sürüler halinde yaşayan popüler balık.' },
      { icon: '🌊', t: 'Sahil Avı', d: 'Uzun kıyı oltası ve küçük parlak kaşık veya tüy yemi; 15-30 metre mesafe.' },
      { icon: '⏰', t: 'Sezon', d: 'Eylül-Kasım arası kıyılara yaklaşır; sabah ve akşam en aktif zamanlar.' },
      { icon: '🚤', t: 'Tekne Avı', d: 'Senkron misina kullanarak birden fazla kanca ile verimli toplu avlanma.' },
      { icon: '📍', t: 'Lokasyonlar', d: 'Karadeniz ve Ege sahilleri, iskele ve balıkçı barınağı çevreleri uygun.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🔥', t: 'Kızartma', d: 'Un veya mısır unuyla kaplandıktan sonra yağda 3-4 dakika; en yaygın tarif.' },
      { icon: '🌿', t: 'Fırın Istavrit', d: 'Zeytinyağı, kekik ve domates ile fırında 180C 20 dakika.' },
      { icon: '🧂', t: 'Tuzlama', d: 'Kuru tuzlama 24-48 saat ile istavrit salamurası uzun süreli saklama sağlar.' },
      { icon: '🥗', t: 'Soğuk Salata', d: 'Haşlanmış istavrit, zeytin, kapari ve dereotlu Akdeniz salatası.' },
      { icon: '🫙', t: 'Marinad', d: 'Zeytinyağı, sarımsak ve kapari ile marine edilen istavrit haftalarca dayanır.' },
    ],
  },
};

export default function CapelinFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('method');
  const data = TABS[tab];
  const accent = '#0369a1';
  const bg = '#000810';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#e0f2fe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐟 Istavrit Rehberi</span>
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
