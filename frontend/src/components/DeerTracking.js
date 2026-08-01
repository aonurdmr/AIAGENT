import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  signs: {
    title: 'Izler',
    items: [
      { icon: '🐾', t: 'Ayak izi', d: 'Karaca izi: 3-4 cm, kalp sekli. Koy kenarlarinda capli izlerde arayis.' },
      { icon: '🌿', t: 'Otlama izi', d: 'Yumuşak uc koparılmis yaprak: karaca once yukariyi keser, sonra altta.' },
      { icon: '💩', t: 'Disi', d: 'Karaca disi: kucuk, yuvarlak, siyah-kahve. Govde yaninda taze pile arama.' },
      { icon: '🪵', t: 'Bos', d: 'Erkek geyik: bosaltma noktaları saglar, surtunme yumusat yeri kayabiliyor.' },
    ],
  },
  behavior: {
    title: 'Davranis',
    items: [
      { icon: '🌅', t: 'Aktif saatler', d: 'Karaca: seher ve alacakaranlık. Gunun en aktif iki penceresi.' },
      { icon: '👃', t: 'Koku algilama', d: 'Geyik koku alir mükemmel. Ruzgari gorme gelmeden pozisyon al.' },
      { icon: '👁️', t: 'Gorme', d: 'Yanlara genis acı ama derinlik az. Hareketsiz dur: seni gormez.' },
      { icon: '🌲', t: 'Habitat', d: 'Orman-tarlı kenarı: yem bolluğu ve kaçış imkânı bir arada. İdeal.' },
    ],
  },
};

export default function DeerTracking() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('signs');
  const data = TABS[tab];

  return (
    <div style={{ background: '#060802', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦌 Karaca Takibi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>İzler · davranış · habitat</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#78350f' : '#0c1004', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0c1004', borderRadius: 14, padding: 14, border: '1px solid #78350f33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #141c08' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#d97706' }}>{item.t}</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 2 }}>{item.d}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
