import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  track: {
    title: 'İzleme',
    items: [
      { icon: '🐾', t: 'Ayak İzi', d: 'Kurt izi 9-11 cm uzunlukta; köpek izinden 4 tırnak düzeni ile ayrılır.' },
      { icon: '🌲', t: 'Habitat', d: 'Orman, step ve dağ ekosistemleri; sürü halinde 50-300 km2 alan kullanır.' },
      { icon: '🌕', t: 'Aktif Saatler', d: 'Şafak ve alacakaranlık en aktif dönem; dolunayda gece avlanması artar.' },
      { icon: '📍', t: 'Türkiye Nüfusu', d: 'Tahminen 7.000 kurt; Doğu Anadolu, Karadeniz dağları ve Trakya bölgesi.' },
      { icon: '📡', t: 'Bilimsel Takip', d: 'Radyo-telemetri ve GPS tasmaları sürü davranışı araştırmalarında kullanılır.' },
    ],
  },
  safety: {
    title: 'Güvenlik',
    items: [
      { icon: '🚶', t: 'Karşılaşma', d: 'Sakin kalın, gözlerini kaçırmayın; kurtlar genellikle insanlardan kaçar.' },
      { icon: '🐑', t: 'Çoban Köpekleri', d: 'Kangal ve Akbash gibi koruyucu köpekler sürüleri kurttan korur.' },
      { icon: '📢', t: 'Ses Çıkarın', d: 'Ormanda yüksek sesle konuşmak kurdu önceden uyarır, karşılaşmayı önler.' },
      { icon: '🌙', t: 'Gece Güvenliği', d: 'Gece kampında yiyecekleri kapalı tutun; kamp ateşi kurt uzaklaştırır.' },
      { icon: '📞', t: 'İhbar', d: 'Yaralı veya sorunlu kurt için Doğa Koruma ve Milli Parklar Genel Müdürlüğü.' },
    ],
  },
};

export default function WolfTracking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('track');
  const data = TABS[tab];
  const accent = '#374151';
  const bg = '#060606';

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#f3f4f6', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 0 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px 10px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 22, cursor: 'pointer' }}>&#8592;</button>
          <span style={{ fontSize: 22, fontWeight: 700 }}>🐺 Kurt İzleme</span>
        </div>
        <div style={{ display: 'flex', margin: '0 16px 18px', background: '#111111', borderRadius: 10, overflow: 'hidden' }}>
          {Object.keys(TABS).map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === k ? accent : 'transparent',
              color: tab === k ? '#fff' : '#9ca3af',
            }}>{TABS[k].title}</button>
          ))}
        </div>
        <div style={{ padding: '0 16px' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ background: '#111111', borderRadius: 12, padding: '14px 16px', marginBottom: 12, borderLeft: `3px solid ${accent}` }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.t}</div>
              <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.5 }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
