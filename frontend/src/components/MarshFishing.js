import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  method: {
    title: 'Teknik',
    items: [
      { icon: '🎣', t: 'Sazlık Avcılığı', d: 'Sazlık kenarında hafif misina ve küçük yem ile turna ve levrek avcılığı yapılır.' },
      { icon: '🚣', t: 'Kayık Seçimi', d: 'Düz tabanlı, sessiz hareket eden fiberglas tekne sazlık avcılığına uygundur.' },
      { icon: '🌅', t: 'Sabah Seansı', d: 'Şafak vakti sazlık kenarında kurbağa ve yavru balık seslerine dikkat edin.' },
      { icon: '🪱', t: 'Doğal Yemler', d: 'Solucan, kurbağa yavrusu ve sazlık böcekleri yerel balıklar için etkilidir.' },
      { icon: '📍', t: 'Sulak Alan Seçimi', d: 'Yem balığı hareketliliği ve su bitkisi yoğunluğu mükemmel nokta göstergesidir.' },
    ],
  },
  species: {
    title: 'Türler',
    items: [
      { icon: '🐟', t: 'Turna Balığı', d: 'Esox lucius; sazlık habitatının güçlü yırtıcısı, pusu kurarak saldırır.' },
      { icon: '🐠', t: 'Levrek', d: 'Perca fluviatilis; sürüler halinde dolaşır, suni yem ile iyi sonuç verir.' },
      { icon: '🐡', t: 'Kefal', d: '50-60 cm boya ulaşan kefal sulak alanlarda yaygın ve lezzetlidir.' },
      { icon: '🦈', t: 'Yayın Balığı', d: 'Silurus glanis; büyük sulak alanlarda derin kanallarda yaşar, geceleri aktif.' },
      { icon: '🐙', t: 'Tatlısu İstakozu', d: 'Astacus astacus; temiz akarsularda yaşar, habitat koruma barometresidir.' },
    ],
  },
};

export default function MarshFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('method');
  const data = TABS[tab];
  const accent = '#0f766e';
  const bg = '#000e0c';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#ccfbf1', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌾 Bataklık Avcılığı</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001a18', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#2dd4bf',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001e1c', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#5eead4', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
