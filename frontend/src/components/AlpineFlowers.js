import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Türler',
    items: [
      { icon: '🌸', t: 'Edelweiss', d: 'Leontopodium alpinum: beyaz yıldız şekli. Türkiye\'de Doğu Karadeniz dağları.' },
      { icon: '💜', t: 'Dağ menekşesi', d: 'Viola tricolor: sarı, mor, beyaz. Yüksek çayırlarda ve kayalıklarda.' },
      { icon: '🌼', t: 'Yüksek çayır papatyası', d: 'Aster alpinus: sarı çekirdek, mor taç. 1800m üzeri yaygın.' },
      { icon: '🔴', t: 'Dağ lalesi', d: 'Tulipa sprengeri: endemik. Karadeniz bölgesi, kırmızı. Koruma altında.' },
    ],
  },
  season: {
    title: 'Mevsim',
    items: [
      { icon: '🌱', t: 'İlkbahar erken', d: 'Mayıs-Haziran: kar erir erimez açar. Hızlı çiçeklenme dönemi.' },
      { icon: '☀️', t: 'Yaz zirvesi', d: 'Temmuz-Ağustos: en zengin çeşitlilik. Kısa yoğun sezon.' },
      { icon: '📷', t: 'Fotoğraf', d: 'Sabah ışığı altın saat. Arka ışık: şeffaflık efekti. Makro lens tercih.' },
      { icon: '⚠️', t: 'Koruma', d: 'Koparma yasak. Fotoğrafla yetinilmeli. Baskı azaltmak için iz üzerinde kal.' },
    ],
  },
};

export default function AlpineFlowers() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#040210', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌸 Alpin Çiçekler</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · mevsim · koruma</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#7c3aed' : '#080418', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#080418', borderRadius: 14, padding: 14, border: '1px solid #7c3aed33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #100830' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#a78bfa' }}>{item.t}</div>
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
