import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  safety: {
    title: 'Guvenlik',
    items: [
      { icon: '🌊', t: 'Gelgit takibi', d: 'Gelmeden once gelgit saatini kontrol et. Gelgit hizlı yukselebilir.' },
      { icon: '🧊', t: 'Kayalik zemin', d: 'Islak kaya son derece kaygan. Yavaş adımlar, her yük transferı kontrollü.' },
      { icon: '⚠️', t: 'Dalgalar', d: 'Arkadan gelen ani dalga: hic beklenmedik. Denize sirti donme.' },
      { icon: '☀️', t: 'Gunes', d: 'Kayaliklarda gunes yansimasi guclu. SPF50+ ve kep zorunlu.' },
    ],
  },
  gear: {
    title: 'Ekipman',
    items: [
      { icon: '👟', t: 'Ayakkabi', d: 'Suya dayanıklı neopren sandalet ya da kilit tabanlı su botu.' },
      { icon: '🔍', t: 'Buyutec', d: 'Kucuk canlıları gorebilmek icin. Cocuklar icin harika.' },
      { icon: '🪣', t: 'Kova & tas', d: 'Gözlem icin kova. Tamamı geri koy: canlı tasimayı minimize et.' },
      { icon: '📷', t: 'Su gecirmez', d: 'Su gecirmez kamera ya da aksiyon kamerasi. Sıcak kaçan an gec.' },
    ],
  },
};

export default function TidePoolSafety() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('safety');
  const data = TABS[tab];

  return (
    <div style={{ background: '#02080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌊 Gelgit Havuzu Güvenliği</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Güvenlik · ekipman · gözlem</div>
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
