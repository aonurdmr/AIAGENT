import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  find: {
    title: 'Bulma',
    items: [
      { icon: '🦀', t: 'Tatlısu Yengeci', d: 'Potamon fluviatile Anadolu dereleri ve gol kenarlarinda yasayan tek turumuz.' },
      { icon: '🌊', t: 'Habitat', d: 'Temiz, oksijenden zengin dere ve rmaklar; tas ve kaya altlarinda saklanir.' },
      { icon: '🌙', t: 'Aktif Saat', d: 'Gece aktif; gunduzu kayalarin altinda gecer, avciligi aksam saatlerinde etkili.' },
      { icon: '📅', t: 'Av Sezonu', d: 'Mayis-Eylul arasi; kis aylarinda derin sulara ve tas altina cekilir.' },
      { icon: '🎣', t: 'Avlama', d: 'El ile tas kaldirarak veya kanca/sepet tuzakla yakalanir; lisans gerekli.' },
    ],
  },
  cook: {
    title: 'Pişirme',
    items: [
      { icon: '🍋', t: 'Haşlama', d: 'Tuzlu kaynayan suya atip 12-15 dakika; limon ve maydanozla servis.' },
      { icon: '🧄', t: 'Sarımsaklı', d: 'Zeytinyağı, bol sarımsak ve kırmızı biber ile kavurma; Karadeniz usulü.' },
      { icon: '🍅', t: 'Domates Sulu', d: 'Taze domates, soğan ve baharatla uzun pişirme; ekmekle sos emilimi.' },
      { icon: '🌶️', t: 'Acılı Pilav', d: 'Yengeç eti çıkarılıp pilav içine; biber ve kişnişle lezzetli oryantal tarz.' },
      { icon: '🫙', t: 'Saklama', d: 'Canlı tutun, pişirmeden önce ölmüş yengeci yemeyin; taze avlayın.' },
    ],
  },
};

export default function FreshwaterCrab() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('find');
  const data = TABS[tab];
  const accent = '#0f766e';
  const bg = '#000e0a';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#ccfbf1', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🦀 Tatlısu Yengeci</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001a14', borderRadius: 10, overflow: 'hidden' }}>
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
            <div key={i} style={{ background: '#001c16', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
