import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  observe: {
    title: 'Gözlem',
    items: [
      { icon: '🦚', t: 'Tavus Kuşu', d: 'Pavo cristatus; Asya kokenli; Turkiye de park ve konaklarda yarim yabani.' },
      { icon: '🌈', t: 'Kuyruk Goruntusu', d: 'Erkek kuyruğu üreme döneminde yelpaze gibi açılır; iridescent renk.' },
      { icon: '📅', t: 'Ureme Donemi', d: 'Subat-Haziran; erkekler "miaou" benzeri sesiyle kur yapar; dislere gosteris.' },
      { icon: '🌿', t: 'Beslenme', d: 'Otlak ve orman kenarlari; tahil, bocek, kertenkele ve kucuk fare yerler.' },
      { icon: '🏡', t: 'Yabani Populasyon', d: 'Cesme, Bodrum ve bazi Ege adalarin da yarim yabani sürüler mevcut.' },
    ],
  },
  care: {
    title: 'Bakım',
    items: [
      { icon: '🌾', t: 'Beslenme', d: 'Tahıl, mısır, sebze ve böcek; yılda 1-2 kez protein takviyesi şarttır.' },
      { icon: '🏠', t: 'Barınak', d: 'Yüksek tünen ağaç veya çardak; yağmur ve soğuktan korunma zorunlu.' },
      { icon: '🪶', t: 'Tüy Dökümü', d: 'Temmuz-Eylül tüy dökümü; dökülmüş kuyruğu ata gibi toplayın.' },
      { icon: '💊', t: 'Sağlık', d: 'Yılda bir parazit tedavisi ve aşı; salgın hastalıklara karşı karantina.' },
      { icon: '🔊', t: 'Ses Sorunu', d: 'Sabah erken yüksek sesle öter; komşu ilişkisini önceden düşünün.' },
    ],
  },
};

export default function PeacockWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('observe');
  const data = TABS[tab];
  const accent = '#0369a1';
  const bg = '#000c18';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#dbeafe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🦚 Tavus Kuşu</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001428', borderRadius: 10, overflow: 'hidden' }}>
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
            <div key={i} style={{ background: '#001830', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
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
