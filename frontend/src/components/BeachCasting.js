import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🎣', t: 'Overhead casting', d: 'Standart yukari atis: kamis 2 saat konumunda geri al, one firlatirken serbest birak.' },
      { icon: '🔄', t: 'Pendulum cast', d: 'Gelismis teknik: yem on salınımla hız kazanir, 150+ metre atis.' },
      { icon: '🎯', t: 'Hedef alan', d: 'Dip cizgisi, tum derinligi degistir: hafif yemler yuzey, agir yemler dip.' },
      { icon: '⚓', t: 'Dip tutturma', d: 'Akar kum zemininde cidar kazık ya da agir sinker şart. Yem kaymaz.' },
    ],
  },
  gear: {
    title: 'Donanim',
    items: [
      { icon: '🏹', t: 'Surf rod', d: '3.6-4.5 metre sahil kamisi. Test agirligi: 100-200 gram.' },
      { icon: '🌀', t: 'Büyük makara', d: '5000-8000 numara surfcasting makarasi. Yeterli ip kapasitesi.' },
      { icon: '🧵', t: 'Misina', d: 'PE 2-4 braid + 50 lb monofilament kılavuz. Ruzgar ve akıntı dayanımı.' },
      { icon: '⚖️', t: 'Agirlik', d: '60-150 gram piramit sinker. Firtinalı havada agır sec.' },
    ],
  },
};

export default function BeachCasting() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020a10', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌊 Sahil Casting</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Atış tekniği · donanım · sahil balıkçılığı</div>
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
