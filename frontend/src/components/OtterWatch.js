import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  observe: {
    title: 'Gözlem',
    items: [
      { icon: '🦦', t: 'Su Samuru', d: 'Lutra lutra; Anadolu akarsu ve göl sistemlerinde yaşayan su memelisi.' },
      { icon: '💧', t: 'Habitat', d: 'Temiz, hızlı akışlı dereler ve göl kıyıları; ağaçlık kıyı şeridi tercih.' },
      { icon: '🐾', t: 'İz ve Yuva', d: 'Akarsu kenarı çamurda 5-7 parmak izli ayak izi; kıyı altı yuva girişi.' },
      { icon: '🌅', t: 'Aktif Saat', d: 'Şafak ve gün batımı; gece beslenmesi de yaygın, özellikle sessiz sularda.' },
      { icon: '📍', t: 'Lokasyon', d: 'Kızılırmak, Sakarya ve Susurluk havzaları ile Doğu Karadeniz dereleri.' },
    ],
  },
  conservation: {
    title: 'Koruma',
    items: [
      { icon: '⚠️', t: 'Tehdit', d: 'Su kalitesi bozulması, habitat tahribatı ve yasa dışı avcılık temel tehditler.' },
      { icon: '🚫', t: 'Yasal Koruma', d: 'Bern Sözleşmesi Ek II; Türkiye mevzuatında kesinlikle koruma altında.' },
      { icon: '🐟', t: 'Av Çakışması', d: 'Balıkçılarla sürtüşme; samur kafes balıklarına zarar verir iddiası yaygın.' },
      { icon: '🔬', t: 'Araştırma', d: 'DHKD ve üniversiteler dışkı DNA analizi ile populasyon izleme çalışması.' },
      { icon: '🤝', t: 'Katılım', d: 'Samur gözlem rehberleri ve fotoğraf kayıtları bilim için değerli veri sağlar.' },
    ],
  },
};

export default function OtterWatch() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('observe');
  const data = TABS[tab];
  const accent = '#0369a1';
  const bg = '#000610';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#dbeafe', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: accent, fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🦦 Su Samuru</span>
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
