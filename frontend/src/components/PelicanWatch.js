import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  observe: {
    title: 'Gözlem',
    items: [
      { icon: '🦢', t: 'Pelikan', d: 'Pelecanus onocrotalus ve P. crispus; Turkiye sulak alanlarin gozbebegi.' },
      { icon: '🌊', t: 'Habitat', d: 'Buyuk gol, lagün ve deltalar; Manyas, Kus Golü ve Gala Golü kritik alanlar.' },
      { icon: '🤝', t: 'Ortakli Avciligi', d: 'Pelikanlarin V formasyonunda birlesik avlanmasi dogal mucizelerden biridir.' },
      { icon: '📅', t: 'En Iyi Donem', d: 'Mart-Eylul yukselme ve kuluculuk; kisinda da bazi bireyler kalir.' },
      { icon: '🔭', t: 'Gözlem Araçları', d: 'Spotting skop ve tripod şart; 50-80x büyütme pelikan kolonisini inceler.' },
    ],
  },
  conservation: {
    title: 'Koruma',
    items: [
      { icon: '⚠️', t: 'Tehdit Durumu', d: 'Kıvırcık pelikan IUCN Hassas; Türkiye üreyen populasyonu küresel önemde.' },
      { icon: '🌿', t: 'Habitat Kaybı', d: 'Kuş Gölü ve Manyas sulak alanları tarım ve kirlilikle alan kaybı yaşıyor.' },
      { icon: '🐟', t: 'Balık Çakışması', d: 'Ticari balıkçılarla çatışma yaşanabiliyor; yerel işbirliği çözüm yolu.' },
      { icon: '📡', t: 'Halkalama', d: 'Kanatına takılan renkli halkalar bireysel takip ve göç araştırmasını sağlar.' },
      { icon: '🤝', t: 'Gönüllülük', d: 'Kuş Araştırmaları Derneği sayım kamplarına katılım imkanı her yıl sunuluyor.' },
    ],
  },
};

export default function PelicanWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('observe');
  const data = TABS[tab];
  const accent = '#0891b2';
  const bg = '#000e14';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#cffafe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🦢 Pelikan Gözlemi</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#001c28', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#22d3ee',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#002030', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#67e8f9', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
