import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  technique: {
    title: 'Teknik',
    items: [
      { icon: '🌊', t: 'Kanal bogazi', d: 'Kanal bogazi balikcilik: aktıntı daralan, enerji yogunlasan bolge. Ideal.' },
      { icon: '⚓', t: 'Akintı karsisi', d: 'Akintiya karsı yem birak: doğal surukleme saglar. Balik bekler.' },
      { icon: '🎣', t: 'Uzun kamis', d: 'Dar kanal: uzun sap ile karsıya fırlat. Kolu kilitle, denge kur.' },
      { icon: '🐟', t: 'Hedef balik', d: 'Kanal baliklari: kefal, levrek, kalkan. Akinti sever, enerji kazanır.' },
    ],
  },
  spots: {
    title: 'Noktalar',
    items: [
      { icon: '🏗️', t: 'Kopru alti', d: 'Kopru altı golgesi: kefal gunduz burada durur. Yem birak, bekle.' },
      { icon: '🏞️', t: 'Kanal kenari', d: 'Beton kanal kenari: yem tutar ve balik cizer. Doğal engelci.' },
      { icon: '🌿', t: 'Ot kaplı alan', d: 'Su bitkisi kenarı: kanalda yetisen ot. Balik otun etrafında doner.' },
      { icon: '⚡', t: 'Aktif dusus', d: 'Yuzey seviye dusum: kopuk ve hava tuzagi olan yer. Balik oksijen ara.' },
    ],
  },
};

export default function TunnelFishing() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('technique');
  const data = TABS[tab];

  return (
    <div style={{ background: '#020a0e', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🌊 Kanal Balıkçılığı</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Teknik · noktalar · akıntı okuma</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#155e75' : '#04121c', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#04121c', borderRadius: 14, padding: 14, border: '1px solid #155e7533' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #081e2c' : 'none' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#67e8f9' }}>{item.t}</div>
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
