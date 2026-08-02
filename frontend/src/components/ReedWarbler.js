import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  identify: {
    title: 'Tanıma',
    items: [
      { icon: '🐦', t: 'Saz Bülbülü', d: 'Acrocephalus scirpaceus; saz ve kamis arasinda yasayan kucuk otucu kus.' },
      { icon: '🎵', t: 'Otus', d: 'Yuksek sesli, tekrarlayan melodiler; sazlik bolgelerinin karakteristik sesi.' },
      { icon: '🌿', t: 'Habitat', d: 'Goller, deltalar ve nehir kenari sazliklari; Sugla, Kizilirmak ve Gediz deltasi.' },
      { icon: '📅', t: 'Ureme Donemi', d: 'Mayis-Agustos; saz yapraklarina astigi kupkuru yuva ustaligi ile taninir.' },
      { icon: '🔭', t: 'Gozlem', d: 'Sabah erken saatlerde sazlik kenarinda dikkatli bekleme; gizlenme ustasi.' },
    ],
  },
  species: {
    title: 'Türler',
    items: [
      { icon: '🟤', t: 'Büyük Saz Bülbülü', d: 'Acrocephalus arundinaceus; daha büyük ve sesli; sazlık habitatı tercih.' },
      { icon: '🟡', t: 'Bataklık Kamışçını', d: 'A. palustris; geçen türe benzer ama göç yolunda farklı yayılım.' },
      { icon: '⚪', t: 'Küçük Saz Kamışçını', d: 'A. schoenobaenus; taralı baş rengi; açık sazlık ve çalı karışımı.' },
      { icon: '🔵', t: 'Savı Kamışçını', d: 'A. melanopogon; küçük bataklık ortamı; Türkiye kıyılarında kışlıyor.' },
      { icon: '🟢', t: 'Göç Dönemi', d: 'Nisan-Mayıs ve Ağustos-Ekim yoğun göç; kıyı bataklıklarında dinlenme.' },
    ],
  },
};

export default function ReedWarbler() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('identify');
  const data = TABS[tab];
  const accent = '#65a30d';
  const bg = '#020a00';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#ecfccb', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐦 Saz Bülbülü</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#0a1400', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#a3e635',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#061000', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#bef264', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
