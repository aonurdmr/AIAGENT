import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Türler',
    items: [
      { icon: '🦉', t: 'Puhu', d: 'Bubo bubo: Turkiyenin en buyuk baykusu. 70cm. Kayalik ve orman kesimlerinde.' },
      { icon: '⬜', t: 'Peçeli baykus', d: 'Tyto alba: kalp seklinde yuz. Ahir ve harabelerde yuva yapar.' },
      { icon: '🌲', t: 'Kukumav', d: 'Athene noctua: kucuk, aktif gunde de. Koy yakinlarinda, cevrede yaygin.' },
      { icon: '🔵', t: 'Uzunkuyruklu', d: 'Strix uralensis: derin karisik ormanda. Uyku halinde tespiti zor.' },
    ],
  },
  observe: {
    title: 'Gözlem',
    items: [
      { icon: '🌙', t: 'Gece saatleri', d: 'Baykuslar alacakaranlıktan sehere: 21.00-03.00 arasi en aktif donem.' },
      { icon: '🔦', t: 'Kırmızı fener', d: 'Kirmizı ısık gece gorusunu bozmaz. Baykus da etkilenmez, kaçmaz.' },
      { icon: '🎵', t: 'Ses taklidi', d: 'Baykus sesini takit: oteki baykus yanit verir. Uygulamalar yardimci.' },
      { icon: '🌳', t: 'Pellet analizi', d: 'Agac dibi: kemik-tuy topu (pellet). Hangi baykus oldugunu gosterir.' },
    ],
  },
};

export default function OwlWatching() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#04040a', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦉 Baykuş Gözlemi</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · habitat · gece gözlem</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#7c3aed' : '#080814', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#080814', borderRadius: 14, padding: 14, border: '1px solid #7c3aed33' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #10101e' : 'none' }}>
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
