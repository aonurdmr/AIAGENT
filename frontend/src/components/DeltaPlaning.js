import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  gear: {
    title: 'Ekipman',
    items: [
      { icon: '🪂', t: 'Yamacsurumu', d: 'Yamac parasutu: cift katman kanadı, fren konumlari, reserve sart.' },
      { icon: '🪁', t: 'Delta kanat', d: 'Delta: sert trapezi boru kanat. Daha basit, daha dusuk hiz, giriş kolay.' },
      { icon: '🪖', t: 'Ekipman', d: 'Kask, harness, acil parasutu: yamac ve delta ucusunda vazgecilmez.' },
      { icon: '📡', t: 'Variometre', d: 'Variometre: inis-kalkis hızı bilgi verir. Termik bulmak icin kritik.' },
    ],
  },
  safety: {
    title: 'Guvenlik',
    items: [
      { icon: '🌤️', t: 'Hava', d: 'Kuvvetli ruzgar ve firtina: hic ucme. Max ruzgar: 25-30 km/s.' },
      { icon: '🏫', t: 'Egitim', d: 'Sertifika kurs: yamac veya delta icin en az P2 lisansi. Tek basına asla.' },
      { icon: '📍', t: 'Bilis', d: 'Inis alani onceden bel: ozel inis pistleri, engellerden uzak alan.' },
      { icon: '🔋', t: 'Sarj', d: 'Elektronik cihazlar: tam sarjlı. Batarya duserse vari sensoru kesilir.' },
    ],
  },
};

export default function DeltaPlaning() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('gear');
  const data = TABS[tab];

  return (
    <div style={{ background: '#040608', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🪂 Yamaç Paraşütü & Delta</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Ekipman · güvenlik · eğitim</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#0284c7' : '#0c1014', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#0c1014', borderRadius: 14, padding: 14, border: '1px solid #0284c733' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #14181e' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#38bdf8' }}>{item.t}</div>
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
