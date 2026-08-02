import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  biology: {
    title: 'Biyoloji',
    items: [
      { icon: '🦅', t: 'Kizil Sahn', d: 'Aquila chrysaetos; 2 metre kanat acikligiyla Turkiye\'nin en buyuk yirtici kusidir.' },
      { icon: '🏔️', t: 'Habitat', d: 'Alp coraklari, kayalik dağlar ve genis acik alanlar favori av bolgesidir.' },
      { icon: '🐰', t: 'Beslenme', d: 'Tavsan, yabani kedi, tilki ve hatta geyik yavrusu avlayabilir.' },
      { icon: '🪺', t: 'Yuvalama', d: 'Kartal yuvasi (eyrie) yillarca kullanilir; yuksek kayaliklar veya tepeler tercih edilir.' },
      { icon: '🔴', t: 'Tehlike Durumu', d: 'Habitat kaybi ve avlanma nedeniyle Turkiye\'de koruma altinda.' },
    ],
  },
  observe: {
    title: 'Gozlem',
    items: [
      { icon: '🔭', t: 'Gozlem Teknigi', d: 'Kaya zirvelerinden spiral usul yukselen hava akimlarinda suzen ucu gozlemleyin.' },
      { icon: '📍', t: 'En Iyi Lokasyonlar', d: 'Kaçkar, Kackar ve Toros daglarinin kayalik bolgelerinde yaygin.' },
      { icon: '🌄', t: 'Gozlem Saati', d: 'Sabah termal hava akimlari olustuktan sonra ve ogle saatleri en aktif donemdir.' },
      { icon: '📸', t: 'Fotograf Ipuclari', d: 'Uzun mesafeli lens (500mm+) ve tripod ile uc anlarini yakalamak mumkun.' },
      { icon: '📱', t: 'Kayit', d: 'eBird ve Birdlife Turkey platformlarina gozlem verisini raporlayin.' },
    ],
  },
};

export default function GoldenEagle() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('biology');
  const data = TABS[tab];
  const accent = '#a16207';
  const bg = '#080400';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fef9c3', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🦅 Kızıl Şahin</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1c1000', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#ca8a04',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#160c00', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fde047', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
