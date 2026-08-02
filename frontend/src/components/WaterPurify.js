import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  methods: {
    title: 'Yontemler',
    items: [
      { icon: '🔥', t: 'Kaynama', d: 'En guvenli: 1 dakika kaynatma (3000m ustu 3 dk). Yakıt gerektiriyor.' },
      { icon: '💊', t: 'Klor tablet', d: 'Kamp tableti: 1 tablet/1L, 30 dk bekleme. Hafif, ucuz, kolay.' },
      { icon: '🧪', t: 'UV kalem', d: 'SteriPen: UV ısikla 60 sn. Pil gerekir. Bulanık suya etki azalır.' },
      { icon: '🫙', t: 'Filtre', d: 'Sawyer / LifeStraw: 0.1 mikron, bakteri ve protozoa tutar. Virus hayir.' },
    ],
  },
  sources: {
    title: 'Su Kaynaklari',
    items: [
      { icon: '⛰️', t: 'Dagi kaynagi', d: 'Yuksek irtifa kaynak: genellikle temiz ama emin olmak icin filtrele.' },
      { icon: '🏞️', t: 'Akan dere', d: 'Akan su durgundan temiz: ust kaynak hep olcmek gerekir.' },
      { icon: '🌧️', t: 'Yagmur suyu', d: 'Kaplamadan toplanan yagmur: genellikle temiz, ama kirli yuzeyden kacan.' },
      { icon: '⚠️', t: 'Durgun su', d: 'Durgun su: Giardia ve Cryptosporidium riski yuksek. Mutlaka arit.' },
    ],
  },
};

export default function WaterPurify() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('methods');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020c10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>💧 Su Arıtma</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Yöntemler · kaynaklar · güvenli içme suyu</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#0369a1' : '#041820', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#041820', borderRadius: 14, padding: 14, border: '1px solid #0369a133' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #08242e' : 'none' }}>
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
