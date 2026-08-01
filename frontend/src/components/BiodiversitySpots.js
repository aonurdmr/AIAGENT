import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SPOTS = [
  { name: 'Kaz Dağları (İda)', region: 'Marmara', d: 'Endemik bitki ve böcek. Kestane ormanı. Kaya kartalı yuvalama.' },
  { name: 'Kuş Gölü (Manyas)', region: 'Marmara', d: 'Uluslararası önemli kışlak. 20+ nesli tehlike altında tür.' },
  { name: 'Gediz Deltası', region: 'Ege', d: 'Flamingo kolonisi. 260+ kuş türü. Kuş cennetleri.' },
  { name: 'Beyşehir Gölü', region: 'İç Anadolu', d: 'Büyük tatlısu gölü. Endemik balık. Su samuru.' },
  { name: 'Toros Dağları (Yüksek Toroslar)', region: 'Güney', d: 'Sedir ve köknar. Dağ keçisi, vaşak, karakartal.' },
  { name: 'Kızılırmak Deltası', region: 'Karadeniz', d: 'Türkiye en önemli ırmak deltası. Çulluk ve ördek kışlağı.' },
  { name: 'Iğdır Ovası / Ağrı', region: 'Doğu', d: 'Bozkır ve step. Süpürgekuşu, bozkirlak, mezgeldek göçü.' },
];

export default function BiodiversitySpots() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#040e06', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🗺️ Biyoçeşitlilik Noktaları</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türkiye en zengin doğa alanları</div>
      </div>

      <div style={{ background: '#081408', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #22c55e33' }}>
        <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 700 }}>🇹🇷 TÜRKİYE</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Türkiye 3 kıtanın kesişiminde 10 000+ bitki türü, 500+ kuş türü ile megabiyoçeşitli ülkelerden.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {SPOTS.map((s, i) => (
          <div key={i} style={{ background: '#081408', borderRadius: 12, padding: '14px 16px', marginBottom: 8, border: '1px solid #22c55e22' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#4ade80' }}>{s.name}</div>
              <div style={{ fontSize: 10, color: '#6b7280', background: '#0a180a', padding: '2px 6px', borderRadius: 6 }}>{s.region}</div>
            </div>
            <div style={{ fontSize: 12, color: '#d1d5db' }}>{s.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
