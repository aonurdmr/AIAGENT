import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = {
  body: {
    title: 'Kisisel',
    items: [
      { icon: '🛁', t: 'Kamp banyosu', d: 'Nehir veya gol yikama: biodegradable sabun, 60m uzakta. LNT kurali.' },
      { icon: '🦷', t: 'Dis fircalama', d: 'Dis macunu su ihtiyaci: biraz su yeterli. Atik suyu geniş alana dagit.' },
      { icon: '🧴', t: 'Antiseptik', d: 'El jeli veya sabun: yemekten once ve tuvalet sonrasi. Hastaliklar yayilmaz.' },
      { icon: '🩹', t: 'Yara bakimi', d: 'Kamp ortaminda yara: bol su, temiz bez, yara kapayici. Enfeksiyon uyarisi.' },
    ],
  },
  camp: {
    title: 'Kamp',
    items: [
      { icon: '🍽️', t: 'Bulasik', d: 'Kamp bulasigi: bir kap isi su + biodegradable deterjan. Topraga dokmeden.' },
      { icon: '🗑️', t: 'Atik', d: 'Cat-hole: 15-20 cm toprak ukamak. Su kaynagindan 60m uzakta.' },
      { icon: '🐭', t: 'Yiyecek depolama', d: 'Koku gecirmez canta: ayi ve kemirgen. Cadirdan uzakta, asili tut.' },
      { icon: '💧', t: 'Gri su', d: 'Gri su (bulasik): genis alana dagitma veya toprak kazarak defnedin.' },
    ],
  },
};

export default function CampingHygiene() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('body');
  const data = TABS[tab];

  return (
    <div style={{ background: '#04080a', minHeight: '100vh', color: '#f9fafb', paddingBottom: 100 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>&#8592;</button>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🧼 Kamp Hijyeni</div>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>Kişisel · kamp · LNT kuralları</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 16px', marginBottom: 16 }}>
        {Object.entries(TABS).map(([k, v]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === k ? '#0e7490' : '#08121a', color: tab === k ? '#fff' : '#9ca3af', fontWeight: 600, fontSize: 13,
          }}>{v.title}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>
        <div style={{ background: '#08121a', borderRadius: 14, padding: 14, border: '1px solid #0e749033' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < data.items.length - 1 ? '1px solid #0e1e28' : 'none' }}>
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
