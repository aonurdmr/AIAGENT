import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Türler',
    items: [
      { icon: '🦅', t: 'Balık Kartalı', d: 'Pandion haliaetus; Eylul-Ekim Bogazdan gec; suya dalis ile balik tutar.' },
      { icon: '🦆', t: 'Karasahin', d: 'Falco subbuteo; hizli ve uçerken avlanan; temmuz-ekim gecis donemi.' },
      { icon: '🦉', t: 'Saka Sahin', d: 'Accipiter nisus; Karadeniz ormanlarindan Ege ye inen kucuk yirtici.' },
      { icon: '🌀', t: 'Kizil Cercel', d: 'Buteo buteo; en yaygin goçmen yirtici; Eylul suru halinde Bogaz uzerinden.' },
      { icon: '⚡', t: 'Sahil Sahin', d: 'Falco peregrinus; en hizli hayvan; 300 km/h dalis hizi; az ama gozlenebilir.' },
    ],
  },
  hotspots: {
    title: 'Lokasyonlar',
    items: [
      { icon: '🗼', t: 'Çamlıca Tepesi', d: 'Eylül-Ekim en yoğun geçiş; Doğa Derneği günlük sayım verileri yayımlar.' },
      { icon: '🌊', t: 'Sivriburnu', d: 'Boğaz ağzında kayalık burun; hava alanı yakını; harika İstanbul silüetiyle.' },
      { icon: '🏔️', t: 'Uludağ Geçidi', d: 'Balıkesir güney dağ silsilesi; geniş açıda yırtıcı süzülme gözlemi.' },
      { icon: '🌅', t: 'En İyi Saat', d: 'Öğlen ısınan hava akımları; termal sütunlar oluşunca yüksekten süzülme.' },
      { icon: '🤝', t: 'Katılım', d: 'Çamlıca sayım kampına gönüllü olmak için Doğa Derneği ile iletişim.' },
    ],
  },
};

export default function RaptorMigration() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];
  const accent = '#c2410c';
  const bg = '#0c0200';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#fff7ed', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🦅 Yırtıcı Göçü</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#1c0400', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#fb923c',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#180600', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#fdba74', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
