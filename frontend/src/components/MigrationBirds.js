import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  species: {
    title: 'Turler',
    items: [
      { icon: '🐦', t: 'Kirlangic', d: 'Hirundo rustica: Subat-Mart gelir, Eylul gider. Ev yakininda yuva.' },
      { icon: '🦅', t: 'Balaban', d: 'Ciconia ciconia: Afrika-Avrupa goc. Tarlalar ve sulak alanlarda.' },
      { icon: '🦆', t: 'Orman kecisi', d: 'Gallinago: yazin kuzey, kis guneyde. Gece gocer, sesle taninir.' },
      { icon: '⚫', t: 'Karasinekci', d: 'Ficedula hypoleuca: Pernambuco-Turuncu goc. Kucuk boyuna gore uzun yol.' },
    ],
  },
  watch: {
    title: 'Gozlem',
    items: [
      { icon: '🌅', t: 'Ilkbahar goc', d: 'Mart-Mayis: kuzey donusu. Kıyı ve vadi: yormulmus kus durmus istirahat.' },
      { icon: '🍂', t: 'Sonbahar goc', d: 'Agustos-Ekim: guneyе goc. Daha uzun sureli, genis cephede.' },
      { icon: '🔭', t: 'Goc noktasi', d: 'Bazi noktalar yoğunlaşma yeri: Bozburun, Hatay, Bogaz gecitleri.' },
      { icon: '🌃', t: 'Gece goc', d: 'Cogu kus gece gocer: yıldız pusulasi kullanir. Sabah dusen yorgun.' },
    ],
  },
};

export default function MigrationBirds() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('species');
  const data = TABS[tab];

  return (
    <div style={{ background: '#02060e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🦅 Göçmen Kuşlar</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Türler · rota · mevsim gözlem</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#0284c7' : '#040c1a', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#040c1a', borderRadius: 14, padding: 14, border: '1px solid #0284c733' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081828' : 'none' }}>
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
