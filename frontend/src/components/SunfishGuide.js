import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Turler',
    items: [
      { icon: '🟡', t: 'Cipura (Sea bream)', d: 'Akdeniz ve Ege: en bilinen tür. Sahil ve kayalık. Yem: midye, karides.' },
      { icon: '🔵', t: 'Sargo', d: 'Daha kucuk cipura. Kayalık ve deniz çayırında. Kıl misina tercih.' },
      { icon: '🟢', t: 'Karagöz', d: 'Siyah benekli, lezzetli. Kumlu ve kayalık zemin. Orta derinlik.' },
      { icon: '🟠', t: 'Fangri', d: 'Buyuk cipura. Açık denizde. İri yem ve güçlü donanim gerekir.' },
    ],
  },
  method: {
    title: 'Teknikler',
    items: [
      { icon: '🎣', t: 'Olta kurulumu', d: 'Dip olta: L-rig veya paternoster. Yem dipte sabıt durmalı.' },
      { icon: '🐚', t: 'En iyi yemler', d: 'Midye, karides, kalamar halka. Taze yem ölüden her zaman iyi.' },
      { icon: '🌅', t: 'Saat', d: 'Alacakaranlik beslenmesi: sabah ilk 2 saat ve gün batımı.' },
      { icon: '🌊', t: 'Akıntı avantajı', d: 'Akıntı kıyısında duran balık daha aktif beslenir. Pozisyon al.' },
    ],
  },
};

export default function SunfishGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020c10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐠 Çipura & Sargo Avı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · yemler · teknikler</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#06b6d4' : '#041018', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#041018', borderRadius: 14, padding: 14, border: '1px solid #06b6d433' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081c28' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#22d3ee' }}>{item.t}</div>
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
