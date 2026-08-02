import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  tips: {
    title: 'İpuçları',
    items: [
      { icon: '🌧️', t: 'Yagmur avantaji', d: 'Yagmur yuzey bozar, balik yukarı gelir. Oksijen artar. Tatli su baligi icin ideal.' },
      { icon: '🌊', t: 'Nehir kenarı', d: 'Yagmur sonrası yukselen nehir: besin tasıyor. Levrek ve alabalik aktiflesir.' },
      { icon: '🐛', t: 'Doğal yem', d: 'Yağmurdan yikanan solucan ve bocek: balıgın en iyi yemi.' },
      { icon: '💧', t: 'Renk degişimi', d: 'Bulanik su: hareketli yem veya parlak renkli lure kullan. Balık goremez.' },
    ],
  },
  gear: {
    title: 'Ekipman',
    items: [
      { icon: '🧥', t: 'Yagmurluk', d: 'Gore-Tex veya seal-seam yagmurluk. Kol agzından su girmemeli.' },
      { icon: '👢', t: 'Su botu', d: 'Neopren veya kauçuk su botu. Sahilde ya da nehir kenarında.' },
      { icon: '📦', t: 'Ekipman koruma', d: 'Elektronik makara ve telefon su gecirmez canta ya da ziplock torba.' },
      { icon: '🎣', t: 'Gripleme', d: 'Islak el ile kayar. Kauçuk kaplamali kol veya balıkçı eldiveni.' },
    ],
  },
};

export default function RainFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('tips');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020810', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌧️ Yağmurda Balıkçılık</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Avantaj · ekipman · teknikler</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#3b82f6' : '#041018', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#041018', borderRadius: 14, padding: 14, border: '1px solid #3b82f633' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081828' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#60a5fa' }}>{item.t}</div>
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
