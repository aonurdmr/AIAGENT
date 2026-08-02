import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  observe: {
    title: 'Gözlem',
    items: [
      { icon: '🦩', t: 'Flamingo', d: 'Phoenicopterus roseus; Turkiye sulak alanlarinin en goze carpan pembe konugu.' },
      { icon: '🌊', t: 'Habitat', d: 'Tuzlu ve acı su gölleri; Tuz Gölü, Burdur ve Çamaltı tuzlaları.' },
      { icon: '🍤', t: 'Beslenme', d: 'Krivetter ve mavi-yesil alg filtrasyonu; egimli gagayla suyun altinda supur.' },
      { icon: '🌸', t: 'Renk Kaynağı', d: 'Karotenoid bileşenleri yedikleri besinlerde; beslenme iyi olunca renk parlak.' },
      { icon: '📅', t: 'Ureme', d: 'Nisan-Haziran; Tuz Golunde binlerce cift buyuk koloni halinde urer.' },
    ],
  },
  tips: {
    title: 'Gözlem İpucu',
    items: [
      { icon: '🔭', t: 'Uzaktan Gözlem', d: 'Spotting skop şart; flamingoların 100 metreden yaklaşınca sürü havalanır.' },
      { icon: '🌅', t: 'En İyi Işık', d: 'Sabah ve akşam alçak güneş flamingonun pembisini en güzel açıdan yakalar.' },
      { icon: '🌡️', t: 'Sıcaklık', d: 'Temmuz-Ağustos tuz gölü çevresi 45°C; susuz gitme, sabah erken başla.' },
      { icon: '📸', t: 'Fotoğraf', d: 'Uzun odaklı 500-800mm lens; toplu uçuş kadrolarında sürü hareketi güzel.' },
      { icon: '🤝', t: 'Gönüllü', d: 'WWF Türkiye flamingo halkalama ve sayım projesi; her yaz katılım mümkün.' },
    ],
  },
};

export default function FlamingWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('observe');
  const data = TABS[tab];
  const accent = '#db2777';
  const bg = '#0a0008';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fce7f3', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🦩 Flamingo Gözlemi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1a0014', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#ec4899',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#160010', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#f9a8d4', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
