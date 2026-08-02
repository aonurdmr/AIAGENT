import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🦑', t: 'Egi maytı', d: 'Kalamari özel egi: dip-orta su. Renk: pembe, turuncu gece; yeşil gündüz.' },
      { icon: '🌙', t: 'Gece avı', d: 'Kalamari ışığa gelir. Iskele ve kayık lambası altı: en etkili yöntem.' },
      { icon: '🎣', t: 'Teknik', d: 'Egi düşür, 2-3 silkele, dur. Kalamari salınan egiye hücum eder.' },
      { icon: '🌊', t: 'Derinlik', d: '5-25m: iyidir. Suyun rengi mavi-yeşil berrak olsun. Balık var mı izle.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🍳', t: 'Tava kalamari', d: 'İnce halkalar, un, zeytinyağı. Yüksek ateş 2-3 dk. Fazla pişirme lastikleştirir.' },
      { icon: '🔥', t: 'Izgara', d: 'Bütün kalamari: 3-4 dk her yüz. Zeytinyağı ve limon. Basit en iyisi.' },
      { icon: '🥘', t: 'Dolma', d: 'İç gövdeye pirinç-soğan doldur. Zeytinyağı, domates suyu ile yavaş pişir.' },
      { icon: '⚠️', t: 'Taziliği', d: 'Kalamari çok çabuk bozulur. Aynı gün pişir veya hemen buzluk.' },
    ],
  },
};

export default function SqouidFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#040010', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦑 Kalamari Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Egi · gece avı · pişirme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#6d28d9' : '#080020', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#080020', borderRadius: 14, padding: 14, border: '1px solid #6d28d933' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #100030' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#c4b5fd' }}>{item.t}</div>
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
