import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  { icon: '🔭', t: 'Ekipman', d: 'Çıplak göz: Pleiades, Orion. Dürbün: Galaksiler. Teleskop: Jüpiter uyduları.' },
  { icon: '🌑', t: 'Ay Fazı', d: 'Yeni ay gecesi en iyi. Dolunay yoğun ışık — gezegenler görülür, yıldız azalır.' },
  { icon: '🏔️', t: 'Yükseklik', d: 'Her 1000m: atmosfer %10 azalır. 2000m+ gökyüzü bazen ışık kirliliği sıfır.' },
  { icon: '👁️', t: 'Karanlık Adaptasyon', d: 'Gözün karanlığa alışması 20-30 dakika. Bu sürede kırmızı ışık kullan.' },
  { icon: '🌌', t: 'Samanyolu', d: 'Türkiye\'de Temmuz-Eylül görünür. Güneyden kuzeye yayı. Yaz üçgeni rehber.' },
  { icon: '🌠', t: 'Meteor Yağmuru', d: 'Perseid (12-13 Ağustos), Leonid (17-18 Kasım). Radyant noktaya bak.' },
];

export default function NightSkyCamp() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#04040e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌌 Kampta Gökyüzü</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yıldız gözlemi · meteor yağmuru · Samanyolu</div>
      </div>

      <div style={{ background: '#08081a', margin: '0 16px 12px', borderRadius: 10, padding: '8px 12px', border: '1px solid #818cf833' }}>
        <div style={{ fontSize: 11, color: '#818cf8', fontWeight: 700 }}>🌌 KARANLIK GÖK</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Işık kirliliğinden uzak Türkiye kampı: Konya-Ereğli bozkırı, Muğla Adaları, Doğu Anadolu yaylaları.</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {TOPICS.map((t, i) => (
          <div key={i} style={{ background: '#08081a', borderRadius: 12, padding: '14px 16px', marginBottom: 8, border: '1px solid #818cf822' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <span style={{ fontSize: 28 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#818cf8' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: '#d1d5db', marginTop: 3 }}>{t.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
