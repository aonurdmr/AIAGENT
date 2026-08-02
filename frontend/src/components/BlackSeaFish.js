import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Turler',
    items: [
      { icon: '🐟', t: 'Hamsi', d: 'Engraulis encrasicolus; Karadeniz\'in simgesi ve en populer baligi.' },
      { icon: '🐠', t: 'Palamut', d: 'Eylul-Kasim arası havyar mevsimiyle sahil avciliginin en heyecanlisidir.' },
      { icon: '🦐', t: 'Kolyoz', d: 'Kucuk scomber; Karadeniz\'in yerel adi ve kolay yakalanabilen populer tur.' },
      { icon: '🐡', t: 'Tekir', d: 'Mullus barbatus; kayalik zeminde yaşar, kiyı oltasıyla kolayca avlanir.' },
      { icon: '🦑', t: 'Barbunya', d: 'Redziye dip baligi; tabanli zeminlerde bulunan ve tava ile lezzetli.' },
    ],
  },
  fishing: {
    title: 'Avcilik',
    items: [
      { icon: '🎣', t: 'Sahil Avı', d: 'Uzun sapli kiyı oltasi ile 20-50 metre mesafeye atis yaparak avlanilir.' },
      { icon: '🚤', t: 'Tekne Avı', d: 'Kıyıdan uzak seferler için kayıkla takip ve düz misinalı tekne avı.' },
      { icon: '🌊', t: 'En İyi Zaman', d: 'Sonbahar altın mevsim; dalgalı havalarda balik kıyıya daha yakın.' },
      { icon: '🌿', t: 'Yem Secimi', d: 'Kalamar dilimi, solucan ve parlak yapay yem Karadeniz baliklari icin etkili.' },
      { icon: '⚖️', t: 'Yasal Boyut', d: 'Her tur icin minimum boy kurallari vardir; guncel mevzuati kontrol edin.' },
    ],
  },
};

export default function BlackSeaFish() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];
  const accent = '#1e3a5f';
  const bg = '#000610';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#dbeafe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🌊 Karadeniz Balıkları</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001020', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#60a5fa',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#001428', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#93c5fd', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
