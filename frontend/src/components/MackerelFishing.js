import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🎣', t: 'Kolyeli olta', d: 'Uskumru: kolyeli sabiki en verimli. 5-6 kanca, parlak renkler.' },
      { icon: '🏃', t: 'Cekme hizi', d: 'Uskumru hizli cekim sever. Sabiki ile hizli yavaş dalgali cekim ideal.' },
      { icon: '⛵', t: 'Tekne izi', d: 'Tekne arkasindan spinnerla cekme: 4-6 knot hizinda uskumru izi.' },
      { icon: '🌊', t: 'Suru takibi', d: 'Uskumru suru: kuslarin denize daldigi yerde. Hizla hareket eder.' },
    ],
  },
  cook: {
    title: 'Pisirme',
    items: [
      { icon: '🔥', t: 'Izgara', d: 'Taze uskumru: 4 dk her yuz, limon + zeytinyagi. Yaglikliği kor ile erir.' },
      { icon: '🫙', t: 'Tuzlama', d: 'Kap uskumru: kat kat tuz ile 3-7 gun. Balik ezmesi veya meze.' },
      { icon: '💨', t: 'Tutsulenme', d: 'Uskumru tutsusunden mukemmeldir: elmacık talaşı ile 2 saat, 70°C.' },
      { icon: '🥗', t: 'Salatasi', d: 'Haslama + maydanoz + sogan + zeytinyagi: Balkan tarzi hafif meze.' },
    ],
  },
};

export default function MackerelFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#02080e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🐟 Uskumru Avcılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknik · sürü · pişirme</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#0369a1' : '#04101a', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#04101a', borderRadius: 14, padding: 14, border: '1px solid #0369a133' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081c28' : 'none' }}>
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
