import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Türler',
    items: [
      { icon: '🔵', t: 'Yusufcuk (Libellula)', d: 'En buyuk tur: 8 cm kanat acıklıgı. Kırmızı veya mavi govde.' },
      { icon: '🟢', t: 'Demseli (Damselfly)', d: 'Kucuk ve ince. Dinlenirken kanatlarini katlıyor. Gol kenari.' },
      { icon: '🟡', t: 'Kahverengi libellula', d: 'Tatlisu caylak yakini. Yumurta bırakma esnasında gorulur.' },
      { icon: '🟠', t: 'Mangroveler yusufcugu', d: 'Sicak sahil bolgelerinde. Uzun sefer edebilir, okyanus gecebilir.' },
    ],
  },
  observe: {
    title: 'Gözlem',
    items: [
      { icon: '🌊', t: 'Su kenari', d: 'Gol, akarsu, bataklık: yumurtlama yerleri. Sabah ve ogle en aktif.' },
      { icon: '☀️', t: 'Sicak hava', d: 'Soguk havada hareketsizlesir. 25°C ustunde en aktif.' },
      { icon: '🎯', t: 'Avlanma', d: 'Yusufcuklar hava boşluğunda avlanır. Ucus bicimi kendine ozgu.' },
      { icon: '📷', t: 'Fotograflama', d: 'Makro lens idealdir. Soguk sabah: ısınmadan önce hareketsiz kalır.' },
    ],
  },
};

export default function DragonFlyGuide() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020c14', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦋 Yusufcuk Rehberi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · habitat · gözlem</div>
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
