import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  types: {
    title: 'Türler',
    items: [
      { icon: '🟢', t: 'Yeşil yosun', d: 'Ulva (marul yosunu): yenilebilir, tatlı su ve deniz. Salata ve çorba.' },
      { icon: '🟤', t: 'Kahverengi yosun', d: 'Fucus: gelgit bölgesinde. Kayaya yapisik, düzensiz şekilli.' },
      { icon: '🔴', t: 'Kirmizi yosun', d: 'Gracilaria: agar kaynagi. Carrageenan ekstraksiyonu icin kullanilir.' },
      { icon: '⚫', t: 'Nori', d: 'Porphyra: Japonlarin nori yapraklari. Turkiye sahillerinde de bulunur.' },
    ],
  },
  use: {
    title: 'Kullanim',
    items: [
      { icon: '🍱', t: 'Yenilebilir', d: 'Ulva ve Porphyra: salataya karıştır, fırınla, cips yap.' },
      { icon: '🌿', t: 'Gubre', d: 'Toplanmıs kıyı yosunu organik gubre. Azot ve potasyum iceriği yuksek.' },
      { icon: '⚗️', t: 'Endüstri', d: 'Agar agar: mutfak jelatini. Carrageenan: süt ve gıda emülsifiyeri.' },
      { icon: '🐟', t: 'Yem cekici', d: 'Yosun yataklari kucuk balikları ceker: cipura ve kolyos icin cazip.' },
    ],
  },
};

export default function SeaweedGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('types');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020e0a', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌿 Deniz Yosunu Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · yenilebilir · kullanım</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#22c55e' : '#081410', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#081410', borderRadius: 14, padding: 14, border: '1px solid #22c55e33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #102018' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#4ade80' }}>{item.t}</div>
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
