import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  types: {
    title: 'Fener Türleri',
    items: [
      { icon: '🔋', t: 'LED fener', d: 'Pil veya sarjli. Hafif, uzun omur, renk secenegi. Kamp standart.' },
      { icon: '⚗️', t: 'Gaz lambasi', d: 'Propan/butan. Guçlu ısık ve ısı verir. Gaz bitmesi sorun.' },
      { icon: '🕯️', t: 'Mum fener', d: 'Ruzgar korumali cam fener. Romantik ama ruzgarda sorunlu.' },
      { icon: '☀️', t: 'Gunes enerjili', d: 'Gunduz sarj, gece kullan. Kotu havada yetersiz kalabilir.' },
    ],
  },
  tips: {
    title: 'Kullanım İpuçları',
    items: [
      { icon: '🌙', t: 'Gece gorus', d: 'Beyaz ısık gece gorusunu bozar. Kirmizi mod ile gorusu koru.' },
      { icon: '🦟', t: 'Bocek cekimi', d: 'Beyaz/UV ışık bocek ceker. Sari veya amber ışık daha az cezbeder.' },
      { icon: '💡', t: 'Lumen sec', d: '200-400 lumen yemek alani icin yeterli. 800+ lumen genis alan.' },
      { icon: '🔌', t: 'Sarj plani', d: 'Dusuk kapasite gece ortasinda sorun. Her gece sarj rutini yap.' },
    ],
  },
};

export default function CampLantern() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('types');
  const data = TABS[tab];

  return (
    <div style={{ background: '#080600', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🏮 Kamp Feneri Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Fener türleri · kullanım · ışık yönetimi</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#f59e0b' : '#100c00', color: tab === k ? '#000' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#100c00', borderRadius: 14, padding: 14, border: '1px solid #f59e0b33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #1c1600' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24' }}>{item.t}</div>
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
